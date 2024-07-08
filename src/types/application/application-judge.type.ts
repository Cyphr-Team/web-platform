import { LoanApplicationStatus } from "../loan-application.type"

interface ISubLoanApplicationResponse {
  id: string
  applicationIdNumber: string
  businessName?: string
  createdAt: string
  submittedAt?: string
  programType: string
}

interface IJudgeLoanApplicationResponse<T> {
  application: ISubLoanApplicationResponse
  applicationCaptureStage: LoanApplicationStatus
  createdAt: string
  scoredAt?: string
  score?: T
}

export type { IJudgeLoanApplicationResponse }
