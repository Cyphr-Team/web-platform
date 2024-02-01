import { ErrorResponse } from "@/types/common.type"
import { API_PATH, APP_PATH, REQUEST_RATE_LIMIT_TIME } from "@/constants"
import { postRequest } from "@/services/client.service"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error"
import { headerWithTemporaryToken } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useRef } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"

export interface ResendCodeRequest {
  token: string
}

export interface ResendCodeResponse {
  email: string
  jwt: string | null
  sent: true
}

export const useResendActivate = () => {
  const navigate = useNavigate()

  const limitResendTimeout = useRef(false)

  return useMutation<
    AxiosResponse<ResendCodeResponse>,
    AxiosError<ErrorResponse> | Error,
    ResendCodeRequest
  >({
    mutationFn: ({ token }) => {
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
        path: API_PATH.users.resendVerificationEmail,
        data: { baseUrl },
        customHeader: headerWithTemporaryToken(token)
      })
    },
    onSuccess({ data }) {
      const { email, jwt } = data

      navigate(
        `${APP_PATH.VERIFY_EMAIL.detail(email)}?${createSearchParams({
          token: jwt || ""
        }).toString()}`,
        { replace: true }
      )
    }
  })
}
