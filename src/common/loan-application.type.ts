export interface Applicant {
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

export interface LoanApplication {
  id: string
  loanProgramId: string
  applicantId: string
  programType: string
  createdAt: string
  applicant: Applicant
  loanAmount: number
  status: string
  progress: number
}
