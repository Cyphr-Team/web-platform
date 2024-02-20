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

export { LoanDocumentType, LoanDocumentStatus }

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
}

export type { LoanDocument }
