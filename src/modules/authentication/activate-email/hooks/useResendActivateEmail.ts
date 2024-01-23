import { ErrorResponse } from "@/common"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import * as z from "zod"

export const resendActivateEmailFormSchema = z.object({
  email: z.string().optional()
})

export type ResendActivateEmailFormValue = z.infer<
  typeof resendActivateEmailFormSchema
>

export interface ResendCodeResponse {
  email: string
}

export const useResendActivateEmail = () => {
  return useMutation<
    AxiosResponse<ResendCodeResponse>,
    AxiosError<ErrorResponse> | string
  >({
    mutationFn: () => {
      const baseUrl = window.location.origin

      return postRequest({
        path: API_PATH.users.resendVerificationEmail,
        data: { baseUrl },
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
