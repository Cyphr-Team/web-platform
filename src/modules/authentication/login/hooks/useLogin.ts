import { APP_PATH } from "@/constants"
import * as z from "zod"
import { useNavigate } from "react-router-dom"
import { axiosClient } from "@/services/client.service"
import { inMemoryJWTService } from "@/services/jwt.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorResponse, UserInfo } from "@/common"
import { AxiosError } from "axios"
import { customRequestHeader } from "@/utils/request-header"

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional()
})

export type LoginFormValue = z.infer<typeof loginFormSchema>

export const useLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation<UserInfo, AxiosError<ErrorResponse>, LoginFormValue>({
    mutationFn: ({ email, password }) => {
      return axiosClient.post(
        "/login",
        { email, password },
        { headers: customRequestHeader.customHeaders }
      )
    },
    onSuccess: (data) => {
      const { accessToken, refreshToken, expiresIn } = data
      inMemoryJWTService.setToken(accessToken, expiresIn)
      inMemoryJWTService.setRefreshToken(refreshToken)
      inMemoryJWTService.setUserInfo(data)
      queryClient.resetQueries()

      navigate(APP_PATH.LOAN_APPLICATION.INDEX)
    }
  })
}
