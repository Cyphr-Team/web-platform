import { type ErrorResponse } from "@/types/common.type"
import { type UserInfo } from "@/types/user.type"
import { API_PATH, APP_PATH } from "@/constants"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { createSearchParams, useNavigate, useParams } from "react-router-dom"
import { type VerifyEmailFormSchema } from "../constants"
import { postRequest } from "@/services/client.service"
import { headerWithTemporaryToken } from "@/utils/request-header"

export const useActivateByCode = () => {
  const navigate = useNavigate()
  const { email } = useParams()

  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse> | string,
    VerifyEmailFormSchema & { token: string }
  >({
    mutationFn: ({ codes, token }) => {
      if (!email) {
        throw Error("Email is not valid")
      }

      return postRequest({
        path: API_PATH.users.activateByOtpCode,
        data: { email, otpCode: codes.join("") },
        customHeader: headerWithTemporaryToken(token)
      })
    },
    onSuccess({ data }) {
      const { accessToken, username } = data

      navigate({
        pathname: APP_PATH.SETUP_PROFILE,
        search: createSearchParams({
          token: accessToken,
          email: username
        }).toString()
      })
    }
  })
}
