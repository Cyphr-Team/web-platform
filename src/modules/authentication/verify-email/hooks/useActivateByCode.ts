import { ErrorResponse, UserInfo } from "@/common"
import { API_PATH, APP_PATH } from "@/constants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { VerifyEmailFormSchema } from "../constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { inMemoryJWTService } from "@/services/jwt.service"

export const useActivateByCode = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { email } = useParams()

  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse> | string,
    VerifyEmailFormSchema
  >({
    mutationFn: ({ codes }) => {
      if (!email) {
        throw "Email is not valid"
      }

      return postRequest({
        path: API_PATH.users.activateByOtpCode,
        data: { email, otpCode: codes.join("") },
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess({ data }) {
      const { accessToken, refreshToken, expiresIn } = data

      inMemoryJWTService.setToken(accessToken, expiresIn)
      inMemoryJWTService.setRefreshToken(refreshToken)
      inMemoryJWTService.setUserInfo(data)
      queryClient.resetQueries()

      navigate(APP_PATH.SETUP_PROFILE_BY_TOKEN.detail(email!))
    }
  })
}
