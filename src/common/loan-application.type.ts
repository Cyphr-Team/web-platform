// ENUM
enum LoanApplicationStatus {
  InProgress = "In progress",
  Flagged = "Flagged",
  Ready = "Ready",
  Closed = "Closed"
}

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

export type { UserLoanApplication, LoanApplication, Applicant, LoanProgram }
export { LoanApplicationStatus }
