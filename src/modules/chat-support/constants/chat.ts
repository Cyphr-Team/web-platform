import { TOAST_MSG } from "@/constants/toastMsg"
import { inMemoryJWTService } from "@/services/jwt.service"
import { toastError } from "@/utils"
import { getSubdomain, getTopLevelDomain } from "@/utils/domain.utils"

interface ChatMessage {
  sessionId: string
  sessionTitle: string
  historyId: string
  mainResponse: string
}

interface StreamChatMessage {
  sessionId: string
  message: string
  isError: boolean
  endOfMessage: boolean
  endOfConversation: boolean
}

interface ChatSession {
  id: string
  userId: string
  title: string
}

const ChatMessageInfo: Record<string, string> = {
  INIT: "Hello",
  COMMON_TOPICS: "Here are our common topics:",
  ERROR: "Something went wrong. Please try again later.",
  END: "End Chat",
  END_INFO: "The chat is ended."
}
const enum ChatSender {
  USER = "user",
  BOT = "bot"
}
const CHAT_SESSION_ID = "CHAT_SESSION_ID"
const CHAT_HISTORY = "CHAT_HISTORY"
const CHAT_POST_INJECT_MESSAGE_EVENT = "rcb-post-inject-message"

const getTenantChatWebsocketUrl = () => {
  try {
    const accessToken = inMemoryJWTService.getUserInfo()?.accessToken ?? ""
    const subdomain = getSubdomain()
    const tld = getTopLevelDomain()

    return `wss://service-platform.cyphrai.${tld}/api/websocket/${subdomain}/${accessToken}`
  } catch {
    toastError({
      ...TOAST_MSG.user.chat,
      description:
        "Failed to connect to the chat service. User is not logged in."
    })

    return ""
  }
}

export {
  ChatMessageInfo,
  ChatSender,
  CHAT_SESSION_ID,
  CHAT_HISTORY,
  CHAT_POST_INJECT_MESSAGE_EVENT,
  getTenantChatWebsocketUrl
}

export type { ChatMessage, ChatSession, StreamChatMessage }
