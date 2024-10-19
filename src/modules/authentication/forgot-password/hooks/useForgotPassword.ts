import { type ErrorResponse, type SuccessResponse } from "@/types/common.type"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import * as z from "zod"

export const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  successSentEmail: z.string().optional()
})

export type ForgotPasswordFormValue = z.infer<typeof forgotPasswordFormSchema>

/**
 * Enter an email to get reset password email
 */
export const useForgotPassword = () => {
  return useMutation<
    AxiosResponse<SuccessResponse>,
    AxiosError<ErrorResponse>,
    ForgotPasswordFormValue
  >({
    mutationFn: ({ email }) => {
      const baseUrl = window.location.origin

      return postRequest({
        path: API_PATH.users.forgotPassword,
        data: { email, baseUrl },
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
