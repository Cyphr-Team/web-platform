import { ErrorResponse, SuccessResponse } from "@/common"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
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
        data: { email, baseUrl }
      })
    }
  })
}
