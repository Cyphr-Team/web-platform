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
import { invitationKeys, userKeys } from "@/constants/query-key"
import { InvitationDetail } from "@/types/upload.type"

export const adminSendInvitationForm = z.object({
  roles: z
    .string()
    .min(1, "Please select a role.")
    .transform((role) => role.toLocaleLowerCase()),
  institutionId: z.string().min(1, "Please select an institution."),
  email: z.string().email({ message: "Enter a valid email address." }),
  expirationDays: z.string().min(1, "Please select an expiration day.")
})

export const adminSendBulkInvitationForm = z.object({
  invitations: z
    .array(
      z.object({
        email: z
          .string()
          .min(1, "Email is required.")
          .max(254, "Email is too long.")
          .email("Invalid email format."),
        role: z
          .string()
          .min(1, "Role is required.")
          .transform((role) => role.toLocaleLowerCase())
      })
    )
    .nonempty("Please enter at least one invitation.")
})

export const adminSendBulkCsvInvitationForm = z.object({
  file: z.instanceof(File).nullable()
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

export type AdminSendBulkInvitationValue = z.infer<
  typeof adminSendBulkInvitationForm
> & {
  baseUrl: string
  expirationDays: string
}

export type AdminSendBulkCsvInvitationValue = z.infer<
  typeof adminSendBulkCsvInvitationForm
> & {
  baseUrl: string
  expirationDays: string
}

export const useSendBulkCsvInvitation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<InvitationDetail>,
    AxiosError<ErrorResponse>,
    AdminSendBulkCsvInvitationValue
  >({
    mutationFn: ({ file, baseUrl, expirationDays }) => {
      const formData = new FormData()
      if (file) {
        formData.append("file", file)
      }
      formData.append("baseUrl", baseUrl)
      formData.append("expirationDays", expirationDays)

      return postRequest({
        path: API_PATH.admin.user.sendBulkCsvInvitation,
        data: formData
      })
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: invitationKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      if (data.totalInvitations === 0) {
        toastError({
          ...TOAST_MSG.user.sendBulkCSVInvitation,
          description: "No invitations were sent."
        })
      } else if (data.failedInvitations > 0) {
        toastError({
          ...TOAST_MSG.user.sendBulkCSVInvitation,
          description: `Failed to send ${data.failedInvitations} invitations.`
        })
      } else {
        toastSuccess(TOAST_MSG.user.sendBulkCSVInvitation)
      }
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.user.sendBulkInvitation,
        description: getAxiosError(error).message
      })
    }
  })
}

export const useSendBulkInvitation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<InvitationDetail>,
    AxiosError<ErrorResponse>,
    AdminSendBulkInvitationValue
  >({
    mutationFn: ({ invitations, baseUrl, expirationDays }) => {
      return postRequest({
        path: API_PATH.admin.user.sendBulkListInvitation,
        data: {
          invitations,
          baseUrl,
          expirationDays
        },
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: invitationKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      if (data.failedInvitations > 0) {
        toastError({
          ...TOAST_MSG.user.sendBulkInvitation,
          description: `Failed to send ${data.failedInvitations} invitations.`
        })
      } else {
        toastSuccess(TOAST_MSG.user.sendBulkInvitation)
      }
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.user.sendBulkInvitation,
        description: getAxiosError(error).message
      })
    }
  })
}
