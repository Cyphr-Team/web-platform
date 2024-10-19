import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type"
import * as z from "zod"

export interface FinancialStatementFormValue {
  applicationId?: string
  files: File[]
  hasDocument: string
  uploadedFiles?: DocumentUploadedResponse[]
  deletedFiles: string[]
}

export const financialStatementFormSchema = z.object({
  applicationId: z.string().optional(),
  hasDocument: z.string(),
  files: ZodFileTypeFactory().optional(),
  uploadedFiles: z.custom<DocumentUploadedResponse[]>().optional(),
  deletedFiles: z.array(z.string()).optional()
})

export const enum FinancialStatementFormField {
  setupId = "setupId",
  applicationId = "applicationId",
  hasDocument = "hasDocument",
  file = "file",
  uploadedFiles = "uploadedFiles",
  files = "files",
  deletedFiles = "deletedFiles"
}
