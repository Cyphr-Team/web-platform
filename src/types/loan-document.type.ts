// ENUM
enum LoanDocumentStatus {
  InProgress = "In progress",
  Verified = "Verified",
  Flagged = "Flagged",
  Unchecked = "Unchecked"
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
  // Example: Bank of America - Bank Statement - Oct 2023.pdf
  fileName: string
  // Example: 200 KB
  fileSize: number
  fileType?: string
  documentType: LoanDocumentType
  createdAt: string
  updatedAt: string
  status: LoanDocumentStatus
}

export type { LoanDocument }
