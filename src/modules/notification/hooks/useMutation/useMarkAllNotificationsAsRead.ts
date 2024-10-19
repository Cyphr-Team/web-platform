import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { QUERY_KEY } from "../../constants/query-key"
import { type Notification } from "../../constants"

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<Notification>,
    AxiosError<ErrorResponse>,
    null
  >({
    mutationFn: () => {
      return postRequest({
        path: API_PATH.notification.markAllAsRead
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.notification.markAllAsRead)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MARK_ALL_NOTIFICATIONS_AS_READ]
      })
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.notification.markAllAsRead,
        description: getAxiosError(error).message
      })
    }
  })
}
