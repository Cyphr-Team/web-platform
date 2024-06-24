import { SourceStatus, TaskFieldStatus } from "../constants/types/business.type"
import { InsightStatus } from "../constants/types/middesk.type"
import { IdentityVerificationStatus } from "../constants/types/smart-kyc"

export const getBadgeVariantByInsightStatus = (status?: InsightStatus) => {
  const statusUppercase = status?.toUpperCase()
  switch (statusUppercase) {
    case SourceStatus.UNKNOWN:
    case TaskFieldStatus.FAILURE:
      return "red"
    case SourceStatus.IN_ACTIVE:
    case TaskFieldStatus.WARNING:
    case IdentityVerificationStatus.UNVERIFIED:
      return "yellow"
    case SourceStatus.ACTIVE:
    case TaskFieldStatus.SUCCESS:
    case IdentityVerificationStatus.VERIFIED:
      return "green"
    default:
      return undefined
  }
}
