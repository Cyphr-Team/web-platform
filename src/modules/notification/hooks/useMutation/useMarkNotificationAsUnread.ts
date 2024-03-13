import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { QUERY_KEY } from "../../constants/query-key"
import { Notification } from "../../constants"

export const useMarkNotificationAsUnread = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<Notification>,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationFn: (notificationId) => {
      return postRequest({
        path: API_PATH.notification.markAsUnread,
        params: { id: notificationId }
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.notification.markAsUnread)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MARK_NOTIFICATION_AS_UNREAD]
      })
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.notification.markAsUnread,
        description: getAxiosError(error).message
      })
    }
  })
}
