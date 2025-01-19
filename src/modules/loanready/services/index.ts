import {
  LoanReadyPlanEnum,
  LoanReadyRefundEnum
} from "@/modules/loanready/constants/package.ts"
import { toLower, toUpper } from "lodash"
import { RatingLevel } from "@/modules/assessment/interface/Rating/type.ts"

export const getLabelByPlan = (plan?: LoanReadyPlanEnum) => {
  switch (toUpper(plan)) {
    case LoanReadyPlanEnum.BASIC:
      return "LoanReady"
    case LoanReadyPlanEnum.PLUS:
      return "LoanReady+"
    default:
      return "-"
  }
}

export const getBadgeVariantByScore = (score?: RatingLevel) => {
  const scoreLowercase = toLower(score)

  switch (scoreLowercase) {
    case RatingLevel.EXCELLENT:
      return "greenShade"
    case RatingLevel.VERY_GOOD:
      return "lightGreenShade"
    case RatingLevel.GOOD:
      return "blueShade"
    case RatingLevel.FAIR:
      return "yellowShade"
    case RatingLevel.POOR:
      return "redShade"
    default:
      return undefined
  }
}

export const getBadgeVariantByTransactionStatus = (
  status?: LoanReadyRefundEnum
) => {
  switch (status) {
    case LoanReadyRefundEnum.PAID:
      return "green"
    case LoanReadyRefundEnum.DENIED_REFUND:
      return "red"
    case LoanReadyRefundEnum.REQUESTED_REFUND:
      return "orange"
    case LoanReadyRefundEnum.REFUNDED:
      return "yellow"
    default:
      return undefined
  }
}
