import { type DocumentType } from "@/modules/loan-application-management/constants/types/document"

// ENUM
enum LoanDocumentStatus {
  VERIFIED = "verified",
  FLAGGED = "flagged",
  UNCHECKED = "unchecked"
}
enum OcrolusLoanDocumentType {
  BANK_STATEMENT = "BANK STATEMENT",
  PAYSTUB = "PAYSTUB",
  W2 = "W-2"
}
enum LoanDocumentAuthenticityScoreStatus {
  VERIFIED = "VERIFIED",
  PENDING = "PENDING",
  NONE = "NONE"
}

export {
  OcrolusLoanDocumentType,
  LoanDocumentStatus,
  LoanDocumentAuthenticityScoreStatus
}

// INTERFACE
interface LoanDocument {
  id: string
  name: string
  // Example: 200 KB
  fileSize: number
  fileType?: string
  ocrolusDocumentType?: OcrolusLoanDocumentType
  type: DocumentType
  createdAt: string
  updatedAt: string
  status: LoanDocumentStatus
  authenticityScoreStatus: LoanDocumentAuthenticityScore
}

interface LoanDocumentAuthenticityScore {
  status: LoanDocumentAuthenticityScoreStatus
  score: number
}

interface CCLoanDocument {
  id: string
  url: string
  // file size: 200KB
  size: 0
  originFileName: string
  fullPathFileName: string
  expiredAt: string
  createdAt: string
  formId: string
}

export type { LoanDocument, CCLoanDocument }
