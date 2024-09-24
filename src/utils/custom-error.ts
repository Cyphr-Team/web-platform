import { ErrorResponse } from "@/types/common.type"
import { AxiosError, isAxiosError } from "axios"

export enum ErrorCode {
  token_invalid = "token_invalid",
  token_invalid_or_expired = "token_invalid_or_expired",
  rate_limit_exceeded = "rate_limit_exceeded",
  institution_subscription_limit_reached = "institution_subscription_limit_reached",
  user_registered = "user_registered",
  cash_flow_not_ready = "cash_flow_not_ready",
  susbscription_not_found = "not_found",
  bank_already_linked = "bank_already_linked",
  unauthorized = "unauthorized"
}

export const getAxiosError = (
  error: AxiosError<ErrorResponse> | Error | null
): {
  code: ErrorCode
  message: string
} => {
  if (isAxiosError(error)) {
    return {
      code: error.response?.data.code,
      message: error.response?.data.message
    }
  }

  return {
    code: "" as ErrorCode,
    message: error?.message ?? ""
  }
}

export const getCustomErrorMsgByCode = (code: ErrorCode) => {
  switch (code) {
    case ErrorCode.token_invalid_or_expired:
      return "Please go back to the forgot password page and request the new email."
    case ErrorCode.rate_limit_exceeded:
      return "Too many attempts to generate an email reset password. Please wait 60 seconds."
    case ErrorCode.user_registered:
      return "This email is already verified, please go back to the sign up page to process the last step."
    case ErrorCode.cash_flow_not_ready:
      return "Bank accounts are not ready to view."
    default:
      return ""
  }
}
