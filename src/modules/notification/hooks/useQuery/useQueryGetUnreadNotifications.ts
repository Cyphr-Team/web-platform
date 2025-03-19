import { type ErrorResponse } from "@/types/common.type"
import { useQuery } from "@tanstack/react-query"
import { type AxiosError } from "axios"
import { QUERY_KEY } from "@/modules/notification/constants/query-key"
import { getRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"

export const useQueryGetUnreadNotifications = () => {
  return useQuery<number, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_UNREAD_NOTIFICATIONS],
    queryFn: () => {
      return getRequest({
        path: API_PATH.notification.getUnreadNotifications
      })
    },
    refetchInterval: 60000
  })
}
