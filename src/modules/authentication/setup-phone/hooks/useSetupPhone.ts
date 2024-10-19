import { type ErrorResponse } from "@/types/common.type"
import { API_PATH, APP_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import * as z from "zod"
import { useNavigate } from "react-router-dom"
import {
  type StytchMember,
  type StytchSendOtpResponse
} from "@/types/auth.type"

export const setupPhoneFormSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  successMsg: z.string().optional()
})

export type SetupPhoneFormValue = z.infer<typeof setupPhoneFormSchema>

/**
 * Enter phone to setup MFA Phone Number
 */
export const useSetupPhone = ({ member }: { member: StytchMember }) => {
  const navigate = useNavigate()

  return useMutation<
    AxiosResponse<StytchSendOtpResponse>,
    AxiosError<ErrorResponse>,
    SetupPhoneFormValue
  >({
    mutationFn: ({ phone }) => {
      return postRequest({
        path: API_PATH.login.sendSmsOtp,
        data: {
          mfaPhoneNumber: phone,
          organizationId: member.organizationId,
          memberId: member.memberId
        },
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: async (_, variables) => {
      navigate(APP_PATH.VERIFY_PHONE, {
        state: { member: { ...member, mfaPhoneNumber: variables.phone } }
      })
    }
  })
}
