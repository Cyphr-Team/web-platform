import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type"

export interface FinancialStatementFormResponse {
  financialProjectionSetupId: string | undefined
  documents: DocumentUploadedResponse[]
  hasDocument: boolean
}

export interface FinancialStatementDeleteRequest {
  setupId: string
  documentId: string
}
