import { ErrorResponse } from "@/common"
import { API_PATH, APP_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

export enum UserStartStatus {
  EMAIL_SENT = "EMAIL_SENT",
  EMAIL_REGISTERED = "EMAIL_REGISTERED",
  EMAIL_WAITING_ACTIVATION = "EMAIL_WAITING_ACTIVATION"
}

export interface UserStart {
  email: string
  status: UserStartStatus
}

export const getStartFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" })
})

export type GetStartUserFormValue = z.infer<typeof getStartFormSchema>

export const useGetStart = () => {
  const navigate = useNavigate()

  return useMutation<
    AxiosResponse<UserStart>,
    AxiosError<ErrorResponse>,
    GetStartUserFormValue
  >({
    mutationFn: ({ email }) => {
      const baseUrl = window.location.origin

      return postRequest({
        path: API_PATH.users.getStart,
        data: { email, baseUrl },
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess({ data }) {
      const { email, status } = data
      if (status !== UserStartStatus.EMAIL_REGISTERED)
        navigate(APP_PATH.VERIFY_EMAIL.detail(email))
    }
  })
}
