enum ChatbotDocumentStatus {
  UPLOADED = "UPLOADED",
  PARSED = "PARSED"
}

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

export type { ChatbotDocument, ChatbotDocumentDeleteRequest }
