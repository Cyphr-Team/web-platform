import { SocialProvider } from "@/types/auth.type"
import { API_PATH, APP_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse, useNavigate } from "react-router-dom"
import { UserDetailInfo } from "@/types/user.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"

interface LoginGoogleRequest {
  provider: SocialProvider
  token: string
}

export const useSignupWithSocialMfa = () => {
  const navigate = useNavigate()

  return useMutation<
    AxiosResponse<UserDetailInfo>,
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
    onSuccess: () => {
      toastSuccess({
        title: "Signup with OAuth",
        description:
          "You have successfully signed up with OAuth. We will redirect you to the Login Page to complete your profile."
      })
      setTimeout(() => {
        navigate(APP_PATH.LOGIN)
      }, 2000)
    },
    onError: (error) => {
      toastError({
        title: "Signup with OAuth",
        description: getAxiosError(error).message
      })
    }
  })
}
