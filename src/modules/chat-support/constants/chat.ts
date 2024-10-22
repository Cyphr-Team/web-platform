interface ChatMessage {
  sessionId: string
  sessionTitle: string
  historyId: string
  mainResponse: string
}

interface ChatSession {
  id: string
  userId: string
  title: string
}

const enum CHAT_MESSAGE {
  COMMON_TOPICS = "Here are our common topics:",
  ERROR = "Something went wrong. Please try again later.",
  END = "End Chat",
  END_INFO = "The chat is ended."
}
const enum CHAT_SENDER {
  USER = "user",
  BOT = "bot"
}
const CHAT_SESSION_ID = "CHAT_SESSION_ID"
const CHAT_HISTORY = "CHAT_HISTORY"
const CHAT_POST_INJECT_MESSAGE_EVENT = "rcb-post-inject-message"

export {
  CHAT_MESSAGE,
  CHAT_SENDER,
  CHAT_SESSION_ID,
  CHAT_HISTORY,
  CHAT_POST_INJECT_MESSAGE_EVENT
}
export type { ChatMessage, ChatSession }
