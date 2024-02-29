// ENUM
enum LoanDocumentStatus {
  VERIFIED = "verified",
  FLAGGED = "flagged",
  UNCHECKED = "unchecked"
}
enum LoanDocumentType {
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
  LoanDocumentType,
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
  ocrolusDocumentType: LoanDocumentType
  createdAt: string
  updatedAt: string
  status: LoanDocumentStatus
  authenticityScoreStatus: LoanDocumentAuthenticityScore
}

interface LoanDocumentAuthenticityScore {
  status: LoanDocumentAuthenticityScoreStatus
  score: number
}

export type { LoanDocument }
