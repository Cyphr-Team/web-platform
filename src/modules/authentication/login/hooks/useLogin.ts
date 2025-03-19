import { APP_PATH, MAX_REMEMBER_ME_DAYS } from "@/constants"
import { axiosClient } from "@/services/client.service"
import { inMemoryJWTService } from "@/services/jwt.service"
import { type ErrorResponse } from "@/types/common.type"
import { type UserInfo } from "@/types/user.type"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { isFinovate } from "@/utils/domain.utils"
import {
  customRequestHeader,
  headerWithRememberMe
} from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional()
})

export type LoginFormValue = z.infer<typeof loginFormSchema>

export const useLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse>,
    LoginFormValue
  >({
    mutationFn: ({ email, password, remember }) => {
      return axiosClient.post(
        "/login",
        { email, password },
        {
          headers: remember
            ? headerWithRememberMe(MAX_REMEMBER_ME_DAYS)
            : customRequestHeader.customHeaders
        }
      )
    },
    onSuccess: async ({ data }) => {
      const { accessToken, refreshToken } = data

      inMemoryJWTService.setToken(accessToken)
      inMemoryJWTService.setRefreshToken(refreshToken)
      inMemoryJWTService.setUserInfo(data)
      queryClient.resetQueries()

      if (isFinovate()) {
        return
      }

      if (checkIsLoanApplicant()) {
        navigate(APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list)
      } else {
        navigate(APP_PATH.INDEX)
      }
    }
  })
}
