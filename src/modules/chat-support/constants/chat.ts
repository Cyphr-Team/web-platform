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
  GREETING: "Hello! How can I assist you today?",
  COMMON_TOPICS: "Here are our common topics:",
  ERROR: "Something went wrong. Please try again.",
  ERROR_UNRECOVERABLE:
    "Something went wrong. Chatbot is unavailable at the moment.",
  RECONNECT:
    "We have reconnected to chat service after session timeout. Please start again.",
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

export {
  ChatMessageInfo,
  ChatSender,
  CHAT_SESSION_ID,
  CHAT_HISTORY,
  CHAT_POST_INJECT_MESSAGE_EVENT
}

export type { ChatMessage, ChatSession, StreamChatMessage }
