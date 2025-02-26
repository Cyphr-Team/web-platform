import { useCallback, useRef } from "react"
import { CHAT_SESSION_ID } from "@/modules/chat-support/constants/chat-info.ts"
import Markdown from "react-markdown"
import { renderToString } from "react-dom/server"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkBreaks from "remark-breaks"
import "katex/dist/katex.min.css"
import { sanitizeMathMarkdown, toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { camelizeStringObject } from "@/utils/converter.utils"
import { getSubdomain, getTopLevelDomain } from "@/utils/domain.utils"
import { inMemoryJWTService, USER_INFO_LS_KEY } from "@/services/jwt.service"
import { useLogout } from "@/hooks/useLogout"
import { CHAT_BOT_MULTIPLE_ENDLINE_REGEX } from "@/constants/regex.constants"
import { type StreamChatMessage } from "@/modules/chat-support/constants/types.ts"
import { ChatMessageInfo } from "@/modules/chat-support/constants/messages.ts"

const CHAT_EVENT_ON_MESSAGE = "message"
/**
 * The message sent to the server to keep the connection alive.
 */
const REQUEST_KEEP_ALIVE = "__ping__"

/**
 * The message sent from the server to the client to keep the connection alive.
 */
const RESPONSE_KEEP_ALIVE = "__pong__"
/**
 * The interval in milliseconds to send a ping message to the server to keep the
 * connection alive.
 * The default websocket disconnection timeout is 60 seconds.
 */
const PING_INTERVAL = 30_000

/**
 * The time in milliseconds the client waits for the server to send a message
 * after the client has sent a message. If no message is sent from the server
 * within this time, the client will assume the connection is closed and
 * reconnect.
 */
const STREAM_WAITING_TIME = 15_000

const useWebSocketClient = () => {
  const client = useRef<WebSocket | null>(null)
  const { signOut } = useLogout()

  const ping = () => {
    client.current?.send(
      JSON.stringify({
        session_id: sessionStorage.getItem(CHAT_SESSION_ID) ?? "",
        message: REQUEST_KEEP_ALIVE
      })
    )
  }

  const getTenantChatWebsocketUrl = useCallback(() => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem(USER_INFO_LS_KEY) ?? ""
      ).accessToken

      if (accessToken == null) return ""

      const subdomain = getSubdomain()
      const tld = getTopLevelDomain()

      return `wss://service-platform.cyphrai.${tld}/api/websocket/${subdomain}/${accessToken}`
    } catch {
      toastError({
        ...TOAST_MSG.user.chat,
        description:
          "Failed to connect to the chat service. User is not logged in."
      })
      signOut()
      client.current?.close()

      return ""
    }
  }, [signOut])

  // Function to establish a WebSocket connection and handle reconnections
  const connect = useCallback(() => {
    if (!client.current) {
      const url = getTenantChatWebsocketUrl()

      if (!url || url === "")
        throw new Error("Failed to connect to the chat service")
      client.current = new WebSocket(url)
    }

    // Set up ping-pong mechanism to keep the connection alive
    client.current.onopen = () => {
      setInterval(ping, PING_INTERVAL)
    }

    client.current.onmessage = (event: MessageEvent<string>) => {
      const data = camelizeStringObject(event.data) as StreamChatMessage

      if (sessionStorage.getItem(CHAT_SESSION_ID) == null) {
        if (data.sessionId == null) {
          sendMessage(ChatMessageInfo.ERROR_UNRECOVERABLE)
          client.current?.close()

          return
        }
        sessionStorage.setItem(CHAT_SESSION_ID, data.sessionId)
        sendMessage(ChatMessageInfo.INIT)
      }
    }

    client.current.onerror = () => {
      // Handle WebSocket errors and reconnect after a delay
      // console.error("WebSocket error")
      setTimeout(() => {
        client.current = null
        sessionStorage.removeItem(CHAT_SESSION_ID)
      }, 1000)
    }

    client.current.onclose = () => {
      // Handle WebSocket closure and reconnect after a delay
      // console.log("WebSocket connection closed")
      setTimeout(() => {
        client.current = null
        sessionStorage.removeItem(CHAT_SESSION_ID)
      }, 1000)
    }
  }, [getTenantChatWebsocketUrl])

  /**
   * Initiates a chat message streaming process via WebSocket.
   *
   * This function returns a promise that resolves with a sanitized chat message
   * after receiving all parts of the message from the WebSocket stream. It listens
   * for incoming WebSocket messages, accumulating them until an end-of-message
   * signal is received. The accumulated message is then sanitized, converted to
   * a string format suitable for rendering, and returned. If an error occurs at
   * any point during this process, the promise is rejected with an error message.
   *
   * @returns {Promise<string>} A promise that resolves with the sanitized chat message.
   */
  const streamChat = async () => {
    const messagePromise = new Promise<string>((resolve, reject) => {
      const isDisconnected = client.current == null

      // If the client is disconnected due to socket timeout, reconnect
      if (isDisconnected) {
        connect()
      }

      const handleMessage = async (event: MessageEvent<string>) => {
        try {
          const data = camelizeStringObject(event.data) as StreamChatMessage

          if (data.message === RESPONSE_KEEP_ALIVE) return
          if (data.endOfMessage) {
            const rawMessage = data.message
            const message = sanitizeMathMarkdown(rawMessage)

            const sanitizedMessage = renderToString(
              Markdown({
                children: message.replace(
                  CHAT_BOT_MULTIPLE_ENDLINE_REGEX,
                  "\n"
                ),
                remarkPlugins: [remarkMath, remarkBreaks],
                rehypePlugins: [rehypeKatex]
              })
            )

            // Clean up: remove the event listener after processing
            client.current?.removeEventListener(
              CHAT_EVENT_ON_MESSAGE,
              handleMessage
            )
            // Resolve the promise with the final message
            if (isDisconnected) {
              resolve(ChatMessageInfo.RECONNECT)
            } else {
              resolve(sanitizedMessage)
            }
          }
        } catch (error) {
          // Reject the promise in case of an error
          reject(ChatMessageInfo.ERROR)
        }
      }

      // Attach the message handler to the WebSocket
      client.current?.addEventListener(CHAT_EVENT_ON_MESSAGE, handleMessage)
    })

    // Stream the message
    // If the message is not received within X seconds, get a new access token, then ask to send the message again
    const timeoutIds: NodeJS.Timeout[] = []
    const timeoutPromise = new Promise<string>((resolve, reject) => {
      const timeoutId = setTimeout(async () => {
        try {
          await inMemoryJWTService.getNewAccessToken()
          client.current?.close()
          connect()
          resolve(ChatMessageInfo.RECONNECT)
        } catch {
          reject(ChatMessageInfo.ERROR)
        }
      }, STREAM_WAITING_TIME)

      timeoutIds.push(timeoutId)
    })

    const promises = [messagePromise, timeoutPromise]

    return await Promise.race(promises).finally(() => {
      // Stop the timeout timer when the promise is resolved/rejected
      clearTimeout(timeoutIds[0])
    })
  }

  /**
   * Sends a message to the WebSocket server for the current session.
   *
   * @param {string} message The message to send
   */
  const sendMessage = (message: string) => {
    try {
      client.current?.send(
        JSON.stringify({
          session_id: sessionStorage.getItem(CHAT_SESSION_ID) ?? "",
          message
        })
      )
    } catch (error) {
      toastError({
        ...TOAST_MSG.user.chat,
        description:
          "Failed to send message. Chat Service is not available at the moment."
      })
    }
  }

  return { client, connect, streamChat, sendMessage }
}

export default useWebSocketClient
