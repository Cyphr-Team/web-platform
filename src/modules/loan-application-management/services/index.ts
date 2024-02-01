import { KYB_VERIFIED_FIELD_STATUS } from "../constants/type"
import { KYC_STATUS } from "../constants/types/kyc"

export const getClassNameFromStatus = (
  status?: KYB_VERIFIED_FIELD_STATUS | KYC_STATUS
) => {
  switch (status) {
    case KYB_VERIFIED_FIELD_STATUS.SUCCESS:
    case KYC_STATUS.PASSED:
    case KYC_STATUS.VERIFIED:
      return "success"
    case KYB_VERIFIED_FIELD_STATUS.FAILURE:
    case KYB_VERIFIED_FIELD_STATUS.UNKNOWN:
    case KYC_STATUS.FAILED:
    case KYC_STATUS.UNKNOWN:
      return "error"
    case KYC_STATUS.UNCHECKED:
    case KYC_STATUS.UNVERIFIED:
    case KYB_VERIFIED_FIELD_STATUS.WARNING:
      return "warning"
    default:
      return "warning"
  }
}
