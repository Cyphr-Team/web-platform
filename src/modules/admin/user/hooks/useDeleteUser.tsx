import { API_PATH } from "@/constants"
import { userKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { type ErrorResponse } from "@/types/common.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { postRequest } from "@/services/client.service.ts"

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<boolean>,
    AxiosError<ErrorResponse>,
    { userIds: string[] }
  >({
    mutationFn: ({ userIds }) => {
      return postRequest({
        path: API_PATH.admin.user.deleteUsersByUserIds,
        data: { userIds }
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.user.deleteUsers)
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      // TODO: When using the new API to fetch the user list, update the queryKey accordingly to invalidate the correct data.
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.user.deleteUsers,
        description: getAxiosError(error).message
      })
    }
  })
}
