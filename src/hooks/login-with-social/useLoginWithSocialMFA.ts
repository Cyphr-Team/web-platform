import {
  SocialProvider,
  StytchPasswordAuthenticateResponse
} from "@/types/auth.type"
import { API_PATH, APP_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { inMemoryJWTService } from "@/services/jwt.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse, useNavigate } from "react-router-dom"
import { toastError } from "../../utils"
import { TOAST_MSG } from "../../constants/toastMsg"
import { UserInfo } from "@/types/user.type"
import { isLaunchKC } from "@/utils/domain.utils"

interface LoginGoogleRequest {
  provider: SocialProvider
  token: string
}

export const useLoginWithSocialMFA = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<
    AxiosResponse<StytchPasswordAuthenticateResponse & UserInfo>,
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
      // For LaunchKC, MFA with OAuth is not enabled
      if (isLaunchKC()) {
        const { accessToken, refreshToken } = data

        inMemoryJWTService.setToken(accessToken)
        inMemoryJWTService.setRefreshToken(refreshToken)
        inMemoryJWTService.setUserInfo(data)
        queryClient.resetQueries()

        navigate(APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list)
        return
      }
      // For the remaining tenants, we need to navigate to the MFA verification page
      const { intermediateSessionToken, member } = data

      inMemoryJWTService.setIntermediateSessionToken(intermediateSessionToken)
      queryClient.resetQueries()

      // If intermediateSessionToken is empty, MFA is not enabled for this Stytch user
      // For current Stytch Dashboard settings, MFA is enabled for all tenants, so this should not happen
      if (intermediateSessionToken === "") {
        toastError({
          title: "Error",
          description:
            "MFA is not enabled for this organization. Please contact support@cyphrai.com for further assistance."
        })
        return
      }
      // Else we need to navigate to the MFA verification page
      // If mfaPhoneNumberVerified is not True or mfaPhoneNumber is empty
      // It means that the user has not validated his/her MFA Phone Number yet
      // Then we need to navigate him/her to the MFA setup page
      if (
        member.mfaPhoneNumber === "" ||
        member.mfaPhoneNumberVerified !== true
      ) {
        navigate(APP_PATH.SETUP_PHONE, { state: { member } })
      }
      // Else we need to navigate to the MFA verification page
      else {
        navigate(APP_PATH.VERIFY_PHONE, {
          state: { member }
        })
      }
    },
    onError: () => {
      toastError({
        ...TOAST_MSG.user.stytchOAuth,
        description:
          "Your Google Account has not been linked. Please go to Sign up with Google to provide your information."
      })
      navigate(APP_PATH.SIGN_UP)
    }
  })
}
