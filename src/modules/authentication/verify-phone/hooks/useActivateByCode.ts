import { type ErrorResponse } from "@/types/common.type"
import { API_PATH, APP_PATH, MAX_REMEMBER_ME_DAYS } from "@/constants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import { type VerifyPhoneFormSchema } from "../constants"
import { postRequest } from "@/services/client.service"
import {
  inMemoryJWTService,
  INTERMEDIATE_SESSION_TOKEN_TEMP_LS_KEY
} from "@/services/jwt.service"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { type StytchMember } from "@/types/auth.type"
import { type UserInfo } from "@/types/user.type"
import {
  customRequestHeader,
  headerWithRememberMe
} from "@/utils/request-header"

export const useActivateByCode = ({
  member,
  remember
}: {
  member: StytchMember
  remember: boolean | undefined
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse> | string,
    VerifyPhoneFormSchema
  >({
    mutationFn: ({ codes }) => {
      return postRequest({
        path: API_PATH.login.activateBySmsOtpCode,
        data: {
          otpCode: codes.join(""),
          organizationId: member.organizationId,
          memberId: member.memberId,
          intermediateSession: localStorage.getItem(
            INTERMEDIATE_SESSION_TOKEN_TEMP_LS_KEY
          )
        },
        customHeader: remember
          ? headerWithRememberMe(MAX_REMEMBER_ME_DAYS)
          : customRequestHeader.customHeaders
      })
    },
    onSuccess({ data }) {
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
  })
}
