import { KYC_STATUS } from "../constants/types/kyc"
import {
  MIDDESK_ACTIVE_STATUS,
  MIDDESK_FOUND_STATUS,
  MIDDESK_HIT_STATUS,
  MiddeskStatus
} from "../constants/types/middesk.type"

export const getBadgeVariantByMiddeskStatus = (status?: MiddeskStatus) => {
  const statusUppercase = status?.toUpperCase()
  switch (statusUppercase) {
    case KYC_STATUS.FAILED:
    case MIDDESK_HIT_STATUS.HITS:
      return "red"
    case KYC_STATUS.UNVERIFIED:
      return "yellow"
    case MIDDESK_HIT_STATUS.NO_HITS:
    case KYC_STATUS.VERIFIED:
    case MIDDESK_ACTIVE_STATUS.DOMESTIC_ACTIVE:
    case MIDDESK_ACTIVE_STATUS.ACTIVE:
    case MIDDESK_FOUND_STATUS.NONE_FOUND:
      return "green"
    default:
      return undefined
  }
}
