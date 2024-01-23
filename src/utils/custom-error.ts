export enum ErrorCode {
  token_invalid_or_expired = "token_invalid_or_expired",
  rate_limit_exceeded = "rate_limit_exceeded"
}

export const getCustomErrorMsgByCode = (code: ErrorCode) => {
  switch (code) {
    case ErrorCode.token_invalid_or_expired:
      return "Please go back to the forgot password page and request the new email"
    case ErrorCode.rate_limit_exceeded:
      return "Too many attempts to generate an email reset password. Please wait 60 seconds"
    default:
      return ""
  }
}
