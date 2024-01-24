import { ErrorResponse } from "@/common"
import { API_PATH, APP_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import * as z from "zod"
import { UserStartStatus } from "../../sign-up/hooks/useGetStart"
import { createSearchParams, useNavigate } from "react-router-dom"
import { headerWithTemporaryToken } from "@/utils/request-header"

export const resendActivateEmailFormSchema = z.object({
  email: z.string().optional()
})

export type ResendActivateEmailFormValue = z.infer<
  typeof resendActivateEmailFormSchema
>

export interface ResendCodeResponse {
  email: string
  jwt: string
  status: UserStartStatus
}

export interface ResendCodeRequest {
  token: string
}

export const useResendActivateEmail = () => {
  const navigate = useNavigate()

  return useMutation<
    AxiosResponse<ResendCodeResponse>,
    AxiosError<ErrorResponse> | Error,
    ResendCodeRequest
  >({
    mutationFn: ({ token }) => {
      const baseUrl = window.location.origin

      return postRequest({
        path: API_PATH.users.resendVerificationEmail,
        data: { baseUrl },
        customHeader: headerWithTemporaryToken(token)
      })
    },
    onSuccess({ data }) {
      const { email, jwt } = data

      navigate({
        pathname: APP_PATH.VERIFY_EMAIL.detail(email),
        search: createSearchParams({ token: jwt || "" }).toString()
      })
    }
  })
}
