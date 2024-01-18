import { ErrorResponse, UserInfo } from "@/common"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useParams } from "react-router-dom"
import * as z from "zod"

export enum PasswordRegex {
  AT_LEAST_ONE_SPECIAL_CHARACTER = "AT_LEAST_ONE_SPECIAL_CHARACTER",
  AT_LEAST_ONE_UPPERCASE = "AT_LEAST_ONE_UPPERCASE",
  AT_LEAST_ONE_LOWERCASE = "AT_LEAST_ONE_LOWERCASE",
  AT_LEAST_ONE_DIGIT = "AT_LEAST_ONE_DIGIT",
  NONE_SPACES = "NONE_SPACES"
}

export const setupPasswordFormSchema = z
  .object({
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

    confirmPassword: z.string(),
    successMsg: z.string().optional()
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
        data: { email, password, token }
      })
    }
  })
}
