import { ErrorResponse, UserInfo } from "@/common"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import * as z from "zod"

export const setupProfileFormSchema = z.object({
  name: z.string().min(1, "Enter a valid name"),
  email: z.string(),
  password: z.string().min(8, "Must be at least 8 characters.")
})

export type SetupProfileFormSchema = z.infer<typeof setupProfileFormSchema>

export const useSetupProfile = () => {
  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse>,
    SetupProfileFormSchema
  >({
    mutationFn: ({ name, password }) => {
      return postRequest({
        path: API_PATH.users.signUp,
        data: { name, password },
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
