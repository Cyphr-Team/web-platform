enum PlanType {
  ANNUAL_RECURRING = "annual_recurring",
  ONE_TIME = "one_time"
}

enum SubscriptionStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  ENDED = "ended"
}

export { PlanType, SubscriptionStatus }

type Limit = {
  unit: string
  limit: number | string
  currentUsage: number
}

type Plan = {
  id: string
  name: string
  description: string
  price: number
  version: number
  type: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

type Instiuttion = {
  id: string
  name: string
  subdomain: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

type Subscription = {
  type: PlanType
  status: SubscriptionStatus
  plan: Plan
  institution: Instiuttion
  createdAt: string
  updatedAt: string
  deletedAt: string
  startedAt: string
  endedAt: string
}

export type { Subscription, Limit }
