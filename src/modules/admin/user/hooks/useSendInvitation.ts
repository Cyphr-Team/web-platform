import { API_PATH } from "@/constants"
import * as z from "zod"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { UserInfo } from "@/types/user.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { invitationKeys } from "@/constants/query-key"

export const adminSendInvitationForm = z.object({
  roles: z
    .string()
    .min(1, "Please select a role.")
    .transform((role) => role.toLocaleLowerCase()),
  institutionId: z.string().min(1, "Please select an institution."),
  email: z.string().email({ message: "Enter a valid email address." }),
  expirationDays: z.string().min(1, "Please select an expiration day.")
})

export type AdminSendInvitationValue = z.infer<
  typeof adminSendInvitationForm
> & {
  baseUrl: string
}

export const useSendInvitation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse>,
    AdminSendInvitationValue
  >({
    mutationFn: ({ email, roles, institutionId, baseUrl, expirationDays }) => {
      return postRequest({
        path: API_PATH.admin.user.sendInvitation,
        data: { email, roles: [roles], institutionId, baseUrl, expirationDays },
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invitationKeys.lists() })
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
