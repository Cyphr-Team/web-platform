import { ErrorResponse } from "@/types/common.type"
import { API_PATH, REQUEST_RATE_LIMIT_TIME } from "@/constants"
import { postRequest } from "@/services/client.service"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useRef } from "react"
import { StytchMember } from "@/types/auth.type"

export interface ResendCodeRequest {
  token: string
}

export interface ResendCodeResponse {
  email: string
  jwt: string | null
  sent: true
}

export const useResendActivate = ({ member }: { member: StytchMember }) => {
  const limitResendTimeout = useRef(false)

  return useMutation<
    AxiosResponse<ResendCodeResponse>,
    AxiosError<ErrorResponse> | Error,
    ResendCodeRequest
  >({
    mutationFn: () => {
      if (limitResendTimeout.current) {
        throw new Error(getCustomErrorMsgByCode(ErrorCode.rate_limit_exceeded))
      }

      limitResendTimeout.current = true
      setTimeout(
        () => (limitResendTimeout.current = false),
        REQUEST_RATE_LIMIT_TIME
      )

      return postRequest({
        path: API_PATH.login.sendSmsOtp,
        data: {
          mfaPhoneNumber: member.mfaPhoneNumber,
          organizationId: member.organizationId,
          memberId: member.memberId
        }
      })
    }
  })
}
