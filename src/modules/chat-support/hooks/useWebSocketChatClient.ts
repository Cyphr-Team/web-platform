import { useCallback, useRef } from "react"
import {
  CHAT_SESSION_ID,
  ChatMessageInfo,
  getTenantChatWebsocketUrl,
  type StreamChatMessage
} from "@/modules/chat-support/constants/chat"
import Markdown from "react-markdown"
import { renderToString } from "react-dom/server"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"
import { sanitizeMathMarkdown, toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { camelizeStringObject } from "@/utils/converter.utils"

const CHAT_EVENT_ON_MESSAGE = "message"

const useWebSocketClient = () => {
  const WS_URL = getTenantChatWebsocketUrl()
  const client = useRef<WebSocket | null>(null)

  // Function to establish a WebSocket connection and handle reconnections
  const connect = useCallback(() => {
    if (!client.current) client.current = new WebSocket(WS_URL)

    client.current.onopen = () => {
      // console.log("WebSocket connected")
    }

    client.current.onmessage = (event: MessageEvent<string>) => {
      const data = camelizeStringObject(event.data) as StreamChatMessage

      if (sessionStorage.getItem(CHAT_SESSION_ID) == null) {
        sessionStorage.setItem(CHAT_SESSION_ID, data.sessionId)
      }
    }

    client.current.onerror = () => {
      // Handle WebSocket errors and reconnect after a delay
      //   console.error("WebSocket error")
      setTimeout(() => {
        client.current = null
        sessionStorage.removeItem(CHAT_SESSION_ID)
        connect()
      }, 1000)
    }

    client.current.onclose = () => {
      // Handle WebSocket closure and reconnect after a delay
      //   console.log("WebSocket connection closed")
      setTimeout(() => {
        client.current = null
        sessionStorage.removeItem(CHAT_SESSION_ID)
        connect()
      }, 1000)
    }
  }, [WS_URL])

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
  const streamChat = () => {
    return new Promise<string>((resolve, reject) => {
      const result: string[] = []

      const handleMessage = async (event: MessageEvent<string>) => {
        try {
          const data = camelizeStringObject(event.data) as StreamChatMessage

          if (data.endOfMessage) {
            const rawMessage = result.join("")
            const message = sanitizeMathMarkdown(rawMessage)

            const sanitizedMessage = renderToString(
              Markdown({
                children: message,
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeKatex]
              })
            )

            // Clean up: remove the event listener after processing
            client.current?.removeEventListener(
              CHAT_EVENT_ON_MESSAGE,
              handleMessage
            )
            // Resolve the promise with the final message
            resolve(sanitizedMessage)
          } else {
            result.push(data.message)
          }
        } catch (error) {
          // Reject the promise in case of an error
          reject(ChatMessageInfo.ERROR)
        }
      }

      // Attach the message handler to the WebSocket
      client.current?.addEventListener(CHAT_EVENT_ON_MESSAGE, handleMessage)
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
