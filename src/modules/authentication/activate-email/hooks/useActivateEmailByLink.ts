import { ErrorResponse, UserInfo } from "@/common"
import { API_PATH } from "@/constants"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"

interface ActivateEmailByLinkRequest {
  token: string
}

export const useActivateEmailByLink = () => {
  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse> | string,
    ActivateEmailByLinkRequest
  >({
    mutationFn: async ({ token }) => {
      await new Promise((res) => {
        setTimeout(() => res(null), 1000)
      })

      return postRequest({
        path: API_PATH.users.activateByToken,
        data: { token },
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
