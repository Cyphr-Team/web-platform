import { SocialProvider, UserInfo } from "@/common"
import { API_PATH, APP_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { inMemoryJWTService } from "@/services/jwt.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse, useNavigate } from "react-router-dom"

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
      const { accessToken, refreshToken, expiresIn } = data

      inMemoryJWTService.setToken(accessToken, expiresIn)
      inMemoryJWTService.setRefreshToken(refreshToken)
      inMemoryJWTService.setUserInfo(data)
      queryClient.resetQueries()

      navigate(APP_PATH.LOAN_APPLICATION.INDEX)
    }
  })
}
