import { type LoanReadyPlanEnum } from "@/modules/loanready/constants/package"

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
  purchasedAt?: string
}

export interface LoanReadySubscriptionList {
  subscriptions: LoanReadySubscription[]
}

export interface LoanReadySubscriptionPaginatedList {
  data: LoanReadySubscription[]
  total: number
  currentOffset: number
}
