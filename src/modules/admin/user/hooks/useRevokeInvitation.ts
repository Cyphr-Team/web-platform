import { API_PATH } from "@/constants"
import { invitationKeys, userKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { delRequest } from "@/services/client.service"
import { ErrorResponse } from "@/types/common.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

export function useRevokeInvitation() {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<boolean>,
    AxiosError<ErrorResponse>,
    { invitationId: string }
  >({
    mutationFn: ({ invitationId }) => {
      if (!invitationId) throw new Error("Missing invitation id")

      return delRequest({
        path: API_PATH.admin.invitation.delete(invitationId),
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invitationKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      toastSuccess(TOAST_MSG.user.revokeInvitation)
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.user.revokeInvitation,
        description: getAxiosError(error).message
      })
    }
  })
}
