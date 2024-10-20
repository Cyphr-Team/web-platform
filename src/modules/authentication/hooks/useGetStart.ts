import { API_PATH, APP_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { createSearchParams, useNavigate } from "react-router-dom"
import * as z from "zod"

export enum UserStartStatus {
  // Continue with verify page
  EMAIL_SENT = "EMAIL_SENT",
  EMAIL_WAITING_VERIFICATION = "EMAIL_WAITING_VERIFICATION",

  // Continue with activation page
  EMAIL_REGISTERED = "EMAIL_REGISTERED",
  USER_WAITING_SETUP_PROFILE = "USER_WAITING_SETUP_PROFILE",
  ALREADY_VERIFIED = "ALREADY_VERIFIED"
}

export interface UserStart {
  email: string
  status: UserStartStatus
  jwt: string | null
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
        data: { email, baseUrl }
      })
    },
    onSuccess({ data }) {
      const { email, status, jwt } = data

      switch (status) {
        case UserStartStatus.EMAIL_SENT:
        case UserStartStatus.EMAIL_WAITING_VERIFICATION: {
          navigate({
            pathname: APP_PATH.VERIFY_EMAIL.detail(email),
            search: createSearchParams({ token: jwt || "" }).toString()
          })
          break
        }
        case UserStartStatus.USER_WAITING_SETUP_PROFILE:
        case UserStartStatus.EMAIL_REGISTERED: {
          navigate({
            pathname: APP_PATH.VERIFY_EMAIL.activateByToken,
            search: createSearchParams({ email, status }).toString()
          })
          break
        }
        case UserStartStatus.ALREADY_VERIFIED: {
          throw new Error(
            "Not implemented yet: UserStartStatus.ALREADY_VERIFIED case"
          )
        }
      }
    }
  })
}
