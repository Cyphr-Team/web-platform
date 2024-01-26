import { API_PATH } from "@/constants"
import * as z from "zod"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse, UserInfo } from "@/common"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"

export const adminSendInvitationForm = z.object({
  roles: z
    .string()
    .min(1, "Please select a role.")
    .transform((role) => role.toLocaleLowerCase()),
  institutionId: z.string().min(1, "InstitutionId is required."),
  email: z.string().email({ message: "Enter a valid email address." })
})

export type AdminSendInvitationValue = z.infer<typeof adminSendInvitationForm>

export const useSendInvitation = () => {
  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse>,
    AdminSendInvitationValue
  >({
    mutationFn: ({ email, roles, institutionId }) => {
      const baseUrl = window.location.origin

      return postRequest({
        path: API_PATH.admin.user.sendInvitation,
        data: { email, roles: [roles], institutionId, baseUrl },
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.user.sendInvitation)
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.user.sendInvitation,
        description: getAxiosError(error).message
      })
    }
  })
}
