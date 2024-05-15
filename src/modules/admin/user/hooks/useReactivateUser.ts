import { API_PATH } from "@/constants"
import { userKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { putRequest } from "@/services/client.service"
import { ErrorResponse } from "@/types/common.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

export function useReactivateUser() {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<boolean>,
    AxiosError<ErrorResponse>,
    { userId: string }
  >({
    mutationFn: ({ userId }) => {
      if (!userId) throw new Error("Missing user id")

      return putRequest({
        path: API_PATH.admin.user.reactivate(userId),
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.user.reactivateUser)
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.user.reactivateUser,
        description: getAxiosError(error).message
      })
    }
  })
}
