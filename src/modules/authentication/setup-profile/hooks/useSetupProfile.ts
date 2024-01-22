import { ErrorResponse, UserInfo } from "@/common"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import * as z from "zod"

export enum PasswordRegex {
  AT_LEAST_ONE_SPECIAL_CHARACTER = "AT_LEAST_ONE_SPECIAL_CHARACTER",
  AT_LEAST_ONE_UPPERCASE = "AT_LEAST_ONE_UPPERCASE",
  AT_LEAST_ONE_LOWERCASE = "AT_LEAST_ONE_LOWERCASE",
  AT_LEAST_ONE_DIGIT = "AT_LEAST_ONE_DIGIT",
  NONE_SPACES = "NONE_SPACES"
}

export const setupProfileFormSchema = z
  .object({
    name: z.string().min(1, "Enter a valid name."),
    email: z.string(),
    password: z
      .string()
      .min(8)
      .regex(
        /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])^.+$/,
        PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER
      )
      .regex(/(?=.*[A-Z])^.+$/, PasswordRegex.AT_LEAST_ONE_UPPERCASE)
      .regex(/(?=.*[a-z])^.+$/, PasswordRegex.AT_LEAST_ONE_LOWERCASE)
      .regex(/(?=.*\d)^.+$/, PasswordRegex.AT_LEAST_ONE_DIGIT)
      .regex(/^[^\s]*$/, PasswordRegex.NONE_SPACES),

    confirmPassword: z.string()
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The confirm passwords did not match",
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
    mutationFn: ({ name, password }) => {
      return postRequest({
        path: API_PATH.users.signUp,
        data: { name, password },
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
