import { ErrorResponse } from "@/common"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useRef } from "react"
import { useParams } from "react-router-dom"

const LIMIT_ERROR =
  "Too many attempts to generate an email reset password. Please wait 60 seconds"
const LIMIT_TIME = 60 * 1000

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
        throw LIMIT_ERROR
      }

      limitResendTimeout.current = true
      setTimeout(() => (limitResendTimeout.current = false), LIMIT_TIME)

      const baseUrl = window.location.origin

      return postRequest({
        path: API_PATH.users.resendVerificationEmail,
        data: { email, baseUrl },
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
