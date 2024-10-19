import { API_PATH, APP_PATH, MAX_REMEMBER_ME_DAYS } from "@/constants"
import { useSendMagicLink } from "@/modules/authentication/magic-link/hooks/useSendMagicLink"
import { axiosClient } from "@/services/client.service"
import { inMemoryJWTService } from "@/services/jwt.service"
import { type StytchPasswordAuthenticateResponse } from "@/types/auth.type"
import { type ErrorResponse } from "@/types/common.type"
import { toastError } from "@/utils"
import { isLaunchKC } from "@/utils/domain.utils"
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

export const useStytchLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate } = useSendMagicLink()

  return useMutation<
    AxiosResponse<StytchPasswordAuthenticateResponse>,
    AxiosError<ErrorResponse>,
    LoginFormValue
  >({
    mutationFn: ({ email, password, remember }) => {
      return axiosClient.post(
        API_PATH.login.loginByPassword,
        { email, password },
        {
          headers: remember
            ? headerWithRememberMe(MAX_REMEMBER_ME_DAYS)
            : customRequestHeader.customHeaders
        }
      )
    },
    onSuccess: async ({ data }, { email, remember }) => {
      // For the remaining tenants, we need to navigate to the MFA verification page
      const { intermediateSessionToken, member } = data

      inMemoryJWTService.setIntermediateSessionToken(intermediateSessionToken)
      queryClient.resetQueries()

      // LaunchKC does not support true MFA flow
      if (isLaunchKC()) {
        mutate({
          email: email,
          loginRedirectUrl: `${window.location.origin}${APP_PATH.REDIRECT_CALLBACK}`,
          signupRedirectUrl: `${window.location.origin}${APP_PATH.REDIRECT_CALLBACK}`
        })

        return
      }

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
      // If mfaPhoneNumberVerified is not True or mfaPhoneNumber is empty
      // It means that the user has not validated his/her MFA Phone Number yet
      // Then we need to navigate him/her to the MFA phone setup page
      if (member.mfaPhoneNumber === "" || !member.mfaPhoneNumberVerified) {
        navigate(APP_PATH.SETUP_PHONE, { state: { member } })
      }
      // Else we need to navigate to the MFA verification page
      else {
        navigate(APP_PATH.VERIFY_PHONE, {
          state: { member, remember }
        })
      }
    }
  })
}
