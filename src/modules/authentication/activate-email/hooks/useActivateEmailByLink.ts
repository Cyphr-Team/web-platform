import { type ErrorResponse } from "@/types/common.type"
import { type UserInfo } from "@/types/user.type"
import { API_PATH } from "@/constants"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { postRequest } from "@/services/client.service"
import { headerWithTemporaryToken } from "@/utils/request-header"

interface ActivateEmailByLinkRequest {
  token: string
}

export const useActivateEmailByLink = () => {
  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse> | Error,
    ActivateEmailByLinkRequest
  >({
    mutationFn: async ({ token }) => {
      return postRequest({
        path: API_PATH.users.activateByToken,
        customHeader: headerWithTemporaryToken(token)
      })
    }
  })
}
