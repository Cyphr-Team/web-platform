enum ChatbotDocumentStatus {
  UPLOADED = "UPLOADED",
  PARSED = "PARSED"
}

enum ChatbotMessageType {
  AI = "AI",
  USER = "USER",
  SYSTEM = "SYSTEM",
  SYSTEM_ERROR = "SYSTEM_ERROR",
  UNKNOWN = "UNKNOWN"
}

export const CHAT_MESSAGE_TYPE = [
  { label: "AI", value: ChatbotMessageType.AI },
  { label: "User", value: ChatbotMessageType.USER },
  { label: "System", value: ChatbotMessageType.SYSTEM },
  { label: "System Error", value: ChatbotMessageType.SYSTEM_ERROR },
  { label: "Unknown", value: ChatbotMessageType.UNKNOWN }
]

interface ChatbotDocumentDeleteRequest {
  documentId: string
}

interface ChatbotDocument {
  id: string
  userId: string
  institutionId: string
  name: string
  // Example: 200 KB
  size: number
  path: string
  type?: string
  createdAt: string
  updatedAt?: string
  extractedAt?: string
  status: ChatbotDocumentStatus
}

interface ChatbotSession {
  id: string
  userId: string
  title?: string
  createdAt: string
  endedAt?: string
  expiredAt?: string
  expired: boolean
}

interface ChatbotHistory {
  id: string
  sessionId: string
  message: string
  messageType: string
  createdAt: string
}

interface ChatbotSessionResponse {
  session: ChatbotSession
  chatHistories: ChatbotHistory[]
}

export type {
  ChatbotDocument,
  ChatbotSession,
  ChatbotHistory,
  ChatbotSessionResponse,
  ChatbotDocumentDeleteRequest
}
