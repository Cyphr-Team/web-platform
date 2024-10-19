import { type ErrorResponse } from "@/types/common.type"
import { API_PATH, REQUEST_RATE_LIMIT_TIME } from "@/constants"
import { postRequest } from "@/services/client.service"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { useRef } from "react"
import {
  type ResendCodeRequest,
  type ResendCodeResponse
} from "@/types/auth.type"

export const useResend = () => {
  const limitResendTimeout = useRef(false)

  return useMutation<
    AxiosResponse<ResendCodeResponse>,
    AxiosError<ErrorResponse> | Error,
    ResendCodeRequest
  >({
    mutationFn: ({ email }) => {
      if (limitResendTimeout.current) {
        throw new Error(getCustomErrorMsgByCode(ErrorCode.rate_limit_exceeded))
      }

      limitResendTimeout.current = true
      setTimeout(
        () => (limitResendTimeout.current = false),
        REQUEST_RATE_LIMIT_TIME
      )

      const baseUrl = window.location.origin

      return postRequest({
        path: API_PATH.users.forgotPassword,
        data: { email, baseUrl },
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
