import { type ErrorResponse } from "@/types/common.type"
import { API_PATH, APP_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import { type StytchSendMagicLinkResponse } from "@/types/auth.type"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastError } from "@/utils"

export interface MagicLinkFormValue {
  email: string
  loginRedirectUrl: string
  signupRedirectUrl: string
}

/**
 * Send Magic Link to user's email
 */
export const useSendMagicLink = () => {
  const navigate = useNavigate()

  return useMutation<
    AxiosResponse<StytchSendMagicLinkResponse>,
    AxiosError<ErrorResponse>,
    MagicLinkFormValue
  >({
    mutationFn: ({ email, loginRedirectUrl, signupRedirectUrl }) => {
      return postRequest({
        path: API_PATH.login.sendMagicLink,
        data: {
          email,
          loginRedirectUrl,
          signupRedirectUrl
        },
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: async (_, { email }) => {
      navigate(APP_PATH.MAGIC_LINK, {
        state: { email }
      })
    },
    onError: async () => {
      toastError({
        ...TOAST_MSG.user.stytchMagicLink,
        description: "Sending magic link failed. Please try again later."
      })
    }
  })
}
