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
  ERROR = "Something went wrong. Please try again later.",
  END = "End Chat"
}
const CHAT_SESSION_ID = "CHAT_SESSION_ID"
const CHAT_HISTORY = "CHAT_HISTORY"

export { CHAT_MESSAGE, CHAT_SESSION_ID, CHAT_HISTORY }
export type { ChatMessage, ChatSession }
