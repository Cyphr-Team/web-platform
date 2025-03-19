import { type LoanApplicationStatus } from "../loan-application.type"

interface SubLoanApplicationResponse {
  id: string
  applicationIdNumber: string
  businessName?: string
  createdAt: string
  submittedAt?: string
  programType: string
}

interface JudgeLoanApplicationResponse<T> {
  application: SubLoanApplicationResponse
  applicationCaptureStage: LoanApplicationStatus
  createdAt: string
  scoredAt?: string
  score?: T
}

export type { JudgeLoanApplicationResponse }
