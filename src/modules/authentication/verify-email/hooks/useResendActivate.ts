import { ErrorResponse } from "@/common"
import { API_PATH, REQUEST_RATE_LIMIT_TIME } from "@/constants"
import { postRequest } from "@/services/client.service"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useRef } from "react"
import { useParams } from "react-router-dom"

export interface ResendCodeRequest {
  email: string
}

export interface ResendCodeResponse {
  email: string
}

export const useResendActivate = () => {
  const { email } = useParams()

  const limitResendTimeout = useRef(false)

  return useMutation<
    AxiosResponse<ResendCodeResponse>,
    AxiosError<ErrorResponse> | string
  >({
    mutationFn: () => {
      if (limitResendTimeout.current) {
        throw getCustomErrorMsgByCode(ErrorCode.rate_limit_exceeded)
      }

      limitResendTimeout.current = true
      setTimeout(
        () => (limitResendTimeout.current = false),
        REQUEST_RATE_LIMIT_TIME
      )

      const baseUrl = window.location.origin

      return postRequest({
        path: API_PATH.users.resendVerificationEmail,
        data: { email, baseUrl },
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
