// ENUM

enum LoanApplicationStatus {
  UNDERWRITTEN = "UNDERWRITTEN",
  CANCELLED = "CANCELLED",
  IN_PROGRESS = "IN_PROGRESS",
  THIRD_PARTY_REJECTED = "THIRD_PARTY_REJECTED",
  THIRD_PARTY_APPROVED = "THIRD_PARTY_APPROVED",
  THIRD_PARTY_PENDING = "THIRD_PARTY_PENDING",
  DRAFT = "DRAFT"
}

export { LoanApplicationStatus }

// INTERFACE
interface Applicant {
  id: string
  institutionId: string
  name: string
  email: string
  status: string
  roles: string[]
  loggedInAt: string
  authProvider: string
  created_at: string
}
interface LoanApplication {
  id: string
  loanProgramId: string
  applicantId: string
  programType: string
  createdAt: string
  applicant: Applicant
  loanAmount: number
  status: LoanApplicationStatus
  progress: number
}
interface LoanProgram {
  id: string
  institutionId: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}
interface UserLoanApplication {
  id: string
  loanProgram: LoanProgram
  applicantId: string
  businessId: string
  createdAt: string
  updatedAt: string
}

interface UserLoanApplicationRequest {
  loanAmount: number
  loanTermInMonth: number
  proposeUseOfLoan: string
}

export type {
  UserLoanApplication,
  LoanApplication,
  Applicant,
  LoanProgram,
  UserLoanApplicationRequest
}
