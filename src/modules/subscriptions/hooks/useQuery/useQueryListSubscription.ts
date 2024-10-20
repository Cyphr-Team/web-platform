import { API_PATH } from "@/constants"
import { subscriptionKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { type ListResponse, type PaginateParams } from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"
import { type Subscription } from "../../types/subscription.types"

type ListSubscriptionsResponse = ListResponse<Subscription>

type Params = PaginateParams

export const useQueryListSubscription = ({ limit, offset }: Params) => {
  return useQuery<ListSubscriptionsResponse>({
    queryKey: subscriptionKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async () => {
      const response = await getRequest<Params, ListSubscriptionsResponse>({
        path: API_PATH.subscriptions.list(),
        params: { limit, offset }
      })

      return response
    },
    placeholderData: keepPreviousData
  })
}
