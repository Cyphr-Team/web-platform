export enum ErrorCode {
  token_invalid_or_expired = "token_invalid_or_expired"
}

export const getCustomErrorMsgByCode = (code: ErrorCode) => {
  switch (code) {
    case ErrorCode.token_invalid_or_expired:
      return "Please go back to the forgot password page and request the new email"
    default:
      return ""
  }
}
