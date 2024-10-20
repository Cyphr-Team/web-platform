import { type ErrorResponse } from "@/types/common.type"
import { API_PATH, APP_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastError } from "@/utils"
import { type UserInfo } from "@/types/user.type"
import { inMemoryJWTService } from "@/services/jwt.service"
import { checkIsLoanApplicant } from "@/utils/check-roles"

export interface AuthenticateMagicLinkFormValue {
  magicLinkToken: string
}

/**
 * Send Magic Link to user's email
 */
export const useAuthenticateWithMagicLink = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse>,
    AuthenticateMagicLinkFormValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.login.activateByMagicLink,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: async ({ data }) => {
      const { accessToken, refreshToken } = data

      inMemoryJWTService.setToken(accessToken)
      inMemoryJWTService.setRefreshToken(refreshToken)
      inMemoryJWTService.setUserInfo(data)
      queryClient.resetQueries()

      if (checkIsLoanApplicant()) {
        navigate(APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list)
      } else {
        navigate(APP_PATH.INDEX)
      }
    },
    onError: async () => {
      toastError({
        ...TOAST_MSG.user.stytchMagicLink,
        description:
          "Failed to authenticate because Magic Link token was used/expired. Please try to login again."
      })
      navigate(APP_PATH.LOGIN)
    }
  })
}
