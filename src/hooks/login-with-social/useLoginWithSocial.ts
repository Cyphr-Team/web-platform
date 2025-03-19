import { type SocialProvider } from "@/types/auth.type"
import { API_PATH, APP_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { inMemoryJWTService } from "@/services/jwt.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse, useNavigate } from "react-router-dom"
import { type UserInfo } from "@/types/user.type"

interface LoginGoogleRequest {
  provider: SocialProvider
  token: string
}

export const useLoginWithSocial = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse>,
    LoginGoogleRequest
  >({
    mutationFn: ({ token, provider }) => {
      return postRequest({
        path: API_PATH.login.loginBySocial,
        data: { token, provider },
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken } = data

      inMemoryJWTService.setToken(accessToken)
      inMemoryJWTService.setRefreshToken(refreshToken)
      inMemoryJWTService.setUserInfo(data)
      queryClient.resetQueries()

      navigate(APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list)
    }
  })
}
