import { type ErrorResponse } from "@/types/common.type"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import * as z from "zod"
import { passwordSchema } from "@/modules/authentication/hooks/usePasswordMatch.ts"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: passwordSchema,
    confirmPassword: z.string()
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The confirm password did not match",
        path: ["confirmPassword"]
      })
    }
  })

export type ChangePasswordFormValue = z.infer<typeof changePasswordFormSchema>

export const useChangePassword = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<ErrorResponse>,
    ChangePasswordFormValue
  >({
    mutationFn: ({ currentPassword, newPassword }) => {
      return postRequest({
        path: API_PATH.users.changePassword,
        data: { currentPassword, newPassword },
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.user.changePassword)
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.user.changePassword,
        description: getAxiosError(error).message
      })
    }
  })
}
