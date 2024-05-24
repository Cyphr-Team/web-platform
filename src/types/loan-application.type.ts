import { LoanDecisionEnum } from "@/modules/loan-application-management/constants/types/application"
import { MicroLoanProgramType, LoanType } from "./loan-program.type"

/* ----- ENUM -----
 * LoanApplicationStatus
 * UseOfLoan
 */
enum LoanApplicationStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  READY_FOR_REVIEW = "READY_FOR_REVIEW",
  IN_REVIEW = "IN_REVIEW",
  CANCELLED = "CANCELLED",
  DENIED = "DENIED",
  APPROVED = "APPROVED",
  UNKNOWN = "UNKNOWN"
}

enum UseOfLoan {
  WORKING_CAPITAL = "working_capital",
  EQUIPMENT = "equipment",
  MATERIALS = "materials",
  STARTUP_COSTS = "startup_costs",
  GROWTH_OPPORTUNITIES = "growth_opportunities",
  OTHER = "other"
}

export { LoanApplicationStatus, UseOfLoan }

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
  programType: LoanType
  programName: string
  createdAt: string
  applicant: Applicant
  requestedLoanAmount: number
  status: LoanApplicationStatus
  progress: number
  businessName?: string
  applicationIdNumber: number
}
interface LoanProgram {
  id: string
  institutionId: string
  name: string
  description: string
  type: string
  createdAt: string
  updatedAt: string
}
interface UserMicroLoanApplication {
  id: string
  loanProgram: MicroLoanProgramType
  applicantId: string
  businessId: string
  loanAmount: number
  loanTermInMonth: number
  proposeUseOfLoan: UseOfLoan
  status: LoanApplicationStatus
  createdAt: string
  updatedAt: string
  decision: LoanDecisionEnum
  decisionNote: string
}

interface UserMicroLoanApplicationRequest {
  loanAmount: number
  loanTermInMonth: number
  proposeUseOfLoan: string
  loanProgramId?: string
}

interface ListLoanProgramResponse {
  loanPrograms: LoanProgram[]
}

export type {
  UserMicroLoanApplication,
  LoanApplication,
  Applicant,
  LoanProgram,
  ListLoanProgramResponse,
  UserMicroLoanApplicationRequest
}
