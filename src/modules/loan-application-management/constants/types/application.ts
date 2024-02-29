export interface LoanDecision {
  decision: string
  note?: string
}

export interface LoanDecisionResponse {
  id: string
  loanApplicationId: string
  applicationId: string
  decision: string
  decisionNote: string
  createdAt: string
  updatedAt: string
}

export enum LoanDecisionEnum {
  APPROVED = "approved",
  DENIED = "denied"
}
