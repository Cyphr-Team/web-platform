import { SubscriptionStatus } from "../types/subscription.types"

const getSubscriptionStatusBadge = (status?: SubscriptionStatus) => {
  switch (status) {
    case SubscriptionStatus.ACTIVE:
      return "green"
    case SubscriptionStatus.CANCELED:
      return "red"
    default:
      return undefined
  }
}

export { getSubscriptionStatusBadge }
