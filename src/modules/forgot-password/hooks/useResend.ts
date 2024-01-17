import { ErrorResponse, ResendCodeRequest, ResendCodeResponse } from "@/common"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useRef } from "react"

const LIMIT_ERROR =
  "Too many attempts to generate an email reset password. Please wait 60 seconds"
const LIMIT_TIME = 60 * 1000

export const useResend = () => {
  const limitResendTimeout = useRef(false)

  return useMutation<
    AxiosResponse<ResendCodeResponse>,
    AxiosError<ErrorResponse> | string,
    ResendCodeRequest
  >({
    mutationFn: ({ email }) => {
      if (limitResendTimeout.current) {
        throw LIMIT_ERROR
      }

      limitResendTimeout.current = true
      setTimeout(() => (limitResendTimeout.current = false), LIMIT_TIME)

      const baseUrl = window.location.origin

      return postRequest({
        path: API_PATH.users.forgotPassword,
        data: { email, baseUrl }
      })
    }
  })
}
