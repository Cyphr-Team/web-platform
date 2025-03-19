import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { type ListResponse, type PaginateParams } from "@/types/common.type"
import {
  type Notification,
  type NotificationReferenceType
} from "../../constants"
import { notificationKeys } from "@/constants/query-key"
import { createSearchParams } from "react-router-dom"
import { z } from "zod"

type ListNotificationResponse = ListResponse<Notification>

export const NotificationFilterSchema = z.object({
  status: z.array(z.object({ label: z.string(), value: z.string() })),
  type: z.array(z.object({ label: z.string(), value: z.string() })),
  search: z.string()
})

export type NotificationFilterValues = z.infer<typeof NotificationFilterSchema>

export interface FilterParams {
  type?: NotificationReferenceType
  read?: boolean
}

type Params = PaginateParams & Partial<FilterParams>

export const useQueryGetNotifications = ({
  limit,
  offset,
  type,
  read
}: Params) => {
  return useQuery<ListNotificationResponse>({
    queryKey: notificationKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        type: type ?? "",
        read: read?.toString() ?? "false"
      }).toString()
    ),
    queryFn: async () => {
      const response = await postRequest<Params, ListNotificationResponse>({
        path: API_PATH.notification.getNotifications,
        data: {
          limit,
          offset,
          type,
          read: read
        }
      })

      return response.data
    },
    placeholderData: keepPreviousData
  })
}
