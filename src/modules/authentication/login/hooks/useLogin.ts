import { APP_PATH, MAX_REMEMBER_ME_DAYS } from "@/constants"
import { TOAST_MSG } from "@/constants/toastMsg"
import { axiosClient } from "@/services/client.service"
import { inMemoryJWTService } from "@/services/jwt.service"
import { ErrorResponse } from "@/types/common.type"
import { UserInfo } from "@/types/user.type"
import { toastError } from "@/utils"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { getSubdomain, isAdmin } from "@/utils/domain.utils"
import { isEnableMultiFactorAuthentication } from "@/utils/feature-flag.utils"
import {
  customRequestHeader,
  headerWithRememberMe
} from "@/utils/request-header"
import { useStytchB2BClient } from "@stytch/nextjs/dist/b2b"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { createSearchParams, useNavigate } from "react-router-dom"
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
  const stytchClient = useStytchB2BClient()

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
      // Start MFA process if FF enabled and session is not present
      // And the current portal is Admin Portal
      if (
        isEnableMultiFactorAuthentication() &&
        !isAdmin() &&
        !stytchClient.session.getInfo().session
      ) {
        try {
          const { refreshToken } = data
          inMemoryJWTService.setTemporaryRefreshToken(refreshToken)
          inMemoryJWTService.setUserInfo(data)
          const org = await stytchClient.organization.getBySlug({
            organization_slug: getSubdomain()
          })
          // Stytch Client calls to get magic link
          await stytchClient.magicLinks.email.loginOrSignup({
            email_address: data.username,
            organization_id: org.organization?.organization_id ?? "",
            login_redirect_url: `${window.location.origin}${APP_PATH.MAGIC_LINK}`,
            signup_redirect_url: `${window.location.origin}${APP_PATH.MAGIC_LINK}`,
            login_template_id: "cyphr-bank-login",
            signup_template_id: "cyphr-bank-signup"
          })
          // Navigate to Magic Link Info page
          return navigate(
            `${APP_PATH.MAGIC_LINK}?${createSearchParams({
              email: data.username || ""
            }).toString()}`
          )
        } catch (error) {
          toastError({
            ...TOAST_MSG.user.stytchMagicLink,
            description: "Failed to send magic link"
          })
          console.error(error)
        }
      } else {
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
      }
    }
  })
}
