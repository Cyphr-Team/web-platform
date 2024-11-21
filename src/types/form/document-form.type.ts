import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"

interface DocumentFetchError {
  message: string
  name: string
  code: string
  status: number
}

interface DocumentFormResponse {
  id: string // UUID
  loanApplicationId: string // UUID
  type: string
  documents: DocumentUploadedResponse[]
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

export type { DocumentFormResponse, DocumentFetchError }
