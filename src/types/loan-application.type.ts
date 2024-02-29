// ENUM

import { LoanProgramType } from "@/modules/loan-application/constants/type"

enum LoanApplicationStatus {
  CANCELLED = "CANCELLED",
  DENIED = "DENIED",
  APPROVED = "APPROVED",
  IN_REVIEW = "IN_REVIEW",
  SUBMITTED = "SUBMITTED",
  DRAFT = "DRAFT",
  UNDERWRITTEN = "UNDERWRITTEN"
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
  loanProgram: LoanProgramType
  applicantId: string
  businessId: string
  loanAmount: number
  loanTermInMonth: number
  proposeUseOfLoan: string
  status: LoanApplicationStatus
  createdAt: string
  updatedAt: string
}

interface UserLoanApplicationRequest {
  loanAmount: number
  loanTermInMonth: number
  proposeUseOfLoan: string
  loanProgramId: string
}

export type {
  UserLoanApplication,
  LoanApplication,
  Applicant,
  LoanProgram,
  UserLoanApplicationRequest
}
