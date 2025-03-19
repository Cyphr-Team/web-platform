import { type ErrorResponse } from "@/types/common.type"
import { type UserInfo } from "@/types/user.type"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { useParams } from "react-router-dom"
import * as z from "zod"
import { passwordFormSchema } from "../../hooks/usePasswordMatch"

export const setupPasswordFormSchema = z
  .object({
    confirmPassword: z.string(),
    successMsg: z.string().optional()
  })
  .merge(passwordFormSchema)
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The confirm passwords did not match",
        path: ["confirmPassword"]
      })
    }
  })

export type SetupPasswordFormValue = z.infer<typeof setupPasswordFormSchema>

/**
 * Enter new password to setup password
 */
export const useSetupPassword = () => {
  const { email, token } = useParams()

  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse>,
    SetupPasswordFormValue
  >({
    mutationFn: ({ password }) => {
      return postRequest({
        path: API_PATH.users.setupPassword,
        data: { email, password, token },
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
