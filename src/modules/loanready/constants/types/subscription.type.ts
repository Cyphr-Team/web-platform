import { type LoanReadyPlan } from "@/modules/loanready/types/payment"

export interface LoanReadyApplicationUpdateRequest {
  paymentTransactionId: string
  applicationId: string
}

export interface LoanReadySubscription {
  id: string
  paymentTransactionId: string
  applicationId: string
  userId: string
  plan: LoanReadyPlan
}
