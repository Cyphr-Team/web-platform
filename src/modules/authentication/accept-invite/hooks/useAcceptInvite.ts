import { type ErrorResponse } from "@/types/common.type"
import { type UserInfo } from "@/types/user.type"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { headerWithTemporaryToken } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { passwordFormSchema } from "../../hooks/usePasswordMatch"
import * as z from "zod"

export const acceptInviteFormSchema = z
  .object({
    name: z.string().min(1, "Enter a valid name."),
    email: z.string(),

    confirmPassword: z.string(),
    token: z.string()
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

export type AcceptInviteFormValue = z.infer<typeof acceptInviteFormSchema>

export const useAcceptInvite = () => {
  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse>,
    AcceptInviteFormValue
  >({
    mutationFn: ({ name, password, token }) => {
      return postRequest({
        path: API_PATH.users.acceptInvite,
        data: { name, password, signInProvider: "password" },
        customHeader: headerWithTemporaryToken(token)
      })
    }
  })
}
