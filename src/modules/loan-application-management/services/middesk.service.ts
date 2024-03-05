import { SourceStatus, TaskFieldStatus } from "../constants/types/business.type"
import { MiddeskStatus } from "../constants/types/middesk.type"

export const getBadgeVariantByMiddeskStatus = (status?: MiddeskStatus) => {
  const statusUppercase = status?.toUpperCase()
  switch (statusUppercase) {
    case SourceStatus.UNKNOWN:
    case TaskFieldStatus.FAILURE:
      return "red"
    case SourceStatus.IN_ACTIVE:
    case TaskFieldStatus.WARNING:
      return "yellow"
    case SourceStatus.ACTIVE:
    case TaskFieldStatus.SUCCESS:
      return "green"
    default:
      return undefined
  }
}
