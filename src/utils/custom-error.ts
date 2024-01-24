import { ErrorResponse } from "@/common"
import { AxiosError, isAxiosError } from "axios"

export enum ErrorCode {
  token_invalid_or_expired = "token_invalid_or_expired",
  rate_limit_exceeded = "rate_limit_exceeded",
  user_registered = "user_registered"
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
      return "Please go back to the forgot password page and request the new email"
    case ErrorCode.rate_limit_exceeded:
      return "Too many attempts to generate an email reset password. Please wait 60 seconds"
    case ErrorCode.user_registered:
      return "This email is already verified, please go back to the sign up page to process the last step."
    default:
      return ""
  }
}
