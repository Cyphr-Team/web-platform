import { SourceStatus, TaskFieldStatus } from "../constants/types/business.type"
import { type InsightStatus } from "../constants/types/insight.type"
import { IdentityVerificationStatus } from "../constants/types/smart-kyc"

/**
 * Service used for Insight data
 * @see InsightStatus
 */

export const getBadgeVariantByInsightStatus = (status?: InsightStatus) => {
  const statusUppercase = status?.toUpperCase()

  switch (statusUppercase) {
    case SourceStatus.UNKNOWN:
    case TaskFieldStatus.FAILURE:
    case IdentityVerificationStatus.UNVERIFIED:
      return "red"
    case SourceStatus.IN_ACTIVE:
    case TaskFieldStatus.WARNING:
      return "yellow"
    case SourceStatus.ACTIVE:
    case TaskFieldStatus.SUCCESS:
    case IdentityVerificationStatus.VERIFIED:
      return "green"
    case TaskFieldStatus.PENDING:
      return "purple"
    default:
      return undefined
  }
}
