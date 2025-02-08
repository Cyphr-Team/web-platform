import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"
import { toLower, toUpper } from "lodash"
import { RatingLevel } from "@/modules/assessment/interface/Rating/type.ts"
import { UserRoles } from "@/types/user.type"
import { nameByRole } from "@/modules/admin/user/constants/roles.constants"

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

export const getBadgeVariantByRole = (role: UserRoles) => {
  const mappedBadgeRole: Record<string, string> = {
    [UserRoles.WORKSPACE_ADMIN]: "admin",
    [UserRoles.REVIEWER]: "reviewer",
    [UserRoles.VIEWER]: "viewer",
    [UserRoles.APPLICANT]: "applicant"
  }

  return mappedBadgeRole[role.toUpperCase()]
}

export const getRoleDisplayName = (role: UserRoles) => {
  switch (role.toUpperCase()) {
    case UserRoles.WORKSPACE_ADMIN:
      return "Admin"
    default:
      return nameByRole(role)
  }
}
