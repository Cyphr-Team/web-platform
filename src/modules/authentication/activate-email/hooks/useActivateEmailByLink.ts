import { ErrorResponse, UserInfo } from "@/common"
import { API_PATH, LOCAL_STORAGE_KEY } from "@/constants"
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
      localStorage.setItem(LOCAL_STORAGE_KEY.signUpIdentity, token)

      return postRequest({
        path: API_PATH.users.activateByToken,
        data: { token },
        customHeader: customRequestHeader.addSignUpJwt().customHeaders
      })
    }
  })
}
