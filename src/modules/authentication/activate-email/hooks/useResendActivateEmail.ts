import { ErrorResponse } from "@/common"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import * as z from "zod"

export const resendActivateEmailFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  successSentEmail: z.string().optional()
})

export type ResendActivateEmailFormValue = z.infer<
  typeof resendActivateEmailFormSchema
>

export interface ResendCodeRequest {
  email: string
}

export interface ResendCodeResponse {
  email: string
}

export const useResendActivateEmail = () => {
  return useMutation<
    AxiosResponse<ResendCodeResponse>,
    AxiosError<ErrorResponse> | string,
    ResendCodeRequest
  >({
    mutationFn: ({ email }) => {
      const baseUrl = window.location.origin

      return postRequest({
        path: API_PATH.users.resendVerificationEmail,
        data: { email, baseUrl },
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
