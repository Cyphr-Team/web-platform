import { type LoanApplicationStatus } from "@/types/loan-application.type"

export enum LoanDecisionEnum {
  APPROVED = "approved",
  DENIED = "denied"
}

export interface LoanDecision {
  decision: LoanApplicationStatus
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

export interface SelectRoundLoanApplication {
  applicationId: string
  status: LoanApplicationStatus
}

export enum LoanStage {
  SUBMISSION = "SUBMISSION",
  UNDERWRITTEN = "UNDERWRITTEN",
  INITIAL_REVIEW = "INITIAL_REVIEW",
  ROUND_1 = "ROUND_1",
  ROUND_2 = "ROUND_2",
  ROUND_3 = "ROUND_3"
}
