import { type LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"

export interface LoanReadyApplicationUpdateRequest {
  paymentTransactionId: string
  applicationId: string
}

export interface LoanReadySubscription {
  id: string
  paymentTransactionId: string
  applicationId: string
  userId: string
  plan: LoanReadyPlanEnum
}

export interface LoanReadySubscriptionList {
  subscriptions: LoanReadySubscription[]
}
