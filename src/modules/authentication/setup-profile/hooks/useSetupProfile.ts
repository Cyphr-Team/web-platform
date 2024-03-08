import { ErrorResponse } from "@/types/common.type"
import { UserInfo } from "@/types/user.type"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { headerWithTemporaryToken } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import * as z from "zod"
import { passwordFormSchema } from "../../hooks/usePasswordMatch"
import { NAME_REGEX } from "@/constants/regex.constants"

export const setupProfileFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required.")
      .max(255, "Name must be at most 255 characters")
      .regex(NAME_REGEX, "Please enter a valid name."),
    email: z.string(),

    confirmPassword: z.string().min(1, "Confirm password is required."),
    token: z.string()
  })
  .merge(passwordFormSchema)
  .superRefine(({ confirmPassword, password, name, email }, ctx) => {
    if (password === name || password === email) {
      ctx.addIssue({
        code: "custom",
        message: `The password should not be the same as your ${
          password === name ? "name" : "email."
        }`,
        path: ["password"]
      })
    }
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The confirm passwords did not match.",
        path: ["confirmPassword"]
      })
    }
  })

export type SetupProfileFormValue = z.infer<typeof setupProfileFormSchema>

export const useSetupProfile = () => {
  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse>,
    SetupProfileFormValue
  >({
    mutationFn: ({ name, password, token }) => {
      return postRequest({
        path: API_PATH.users.signUp,
        data: { name, password },
        customHeader: headerWithTemporaryToken(token)
      })
    }
  })
}
