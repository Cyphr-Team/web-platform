enum PlanType {
  ANNUAL_RECURRING = "annual_recurring",
  ONE_TIME = "one_time"
}

enum SubscriptionStatus {
  ACTIVE = "active",
  CANCELLED = "cancelled",
  ENDED = "ended"
}

export { PlanType, SubscriptionStatus }

type Limit = {
  unit: string
  limit: number | string
  currentUsage: number
}

type Subscription = {
  type: PlanType
  planName: string
  institutionName: string
  status: SubscriptionStatus
  createdAt: string
  nextRenewal?: string
  price?: number
  currency: string
  limit?: Limit[]
}

export type { Subscription, Limit }
