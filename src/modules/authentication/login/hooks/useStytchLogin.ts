import { API_PATH, APP_PATH, MAX_REMEMBER_ME_DAYS } from "@/constants"
import { axiosClient } from "@/services/client.service"
import { inMemoryJWTService } from "@/services/jwt.service"
import { StytchPasswordAuthenticateResponse } from "@/types/auth.type"
import { ErrorResponse } from "@/types/common.type"
import { toastError } from "@/utils"
import {
  customRequestHeader,
  headerWithRememberMe
} from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
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
    onSuccess: async ({ data }, { remember }) => {
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
      }
      // Else we need to navigate to the MFA verification page
      else {
        // If mfaPhoneNumberVerified is not True or mfaPhoneNumber is empty
        // It means that the user has not validated his/her MFA Phone Number yet
        // Then we need to navigate him/her to the MFA phone setup page
        if (
          member.mfaPhoneNumber === "" ||
          member.mfaPhoneNumberVerified !== true
        ) {
          navigate(APP_PATH.SETUP_PHONE, { state: { member } })
        }
        // Else we need to navigate to the MFA verification page
        else {
          navigate(APP_PATH.VERIFY_PHONE, {
            state: { member, remember }
          })
        }
      }
    }
  })
}
