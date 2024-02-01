import { KYB_VERIFIED_FIELD_STATUS } from "../constants/type"

export const getClassNameFromStatus = (status?: KYB_VERIFIED_FIELD_STATUS) => {
  switch (status) {
    case KYB_VERIFIED_FIELD_STATUS.SUCCESS:
      return "success"
    case KYB_VERIFIED_FIELD_STATUS.FAILURE:
      return "error"
    case KYB_VERIFIED_FIELD_STATUS.WARNING:
      return "warning"
    default:
      return "warning"
  }
}
