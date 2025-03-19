import { API_PATH } from "@/constants"
import { userKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { delRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"

export function useDeactivateUser() {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<boolean>,
    AxiosError<ErrorResponse>,
    { userId: string }
  >({
    mutationFn: ({ userId }) => {
      if (!userId) throw new Error("Missing user id")

      return delRequest({
        path: API_PATH.admin.user.deactivate(userId),
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.user.deactivateUser)
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.user.deactivateUser,
        description: getAxiosError(error).message
      })
    }
  })
}
