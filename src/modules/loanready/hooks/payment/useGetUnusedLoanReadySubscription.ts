import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { type LoanReadySubscriptionPaginatedList } from "@/modules/loanready/constants/types/subscription.type"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "react-router-dom"

export const useGetUnusedLoanReadySubscription = ({
  enabled
}: {
  enabled: boolean
}) => {
  return useQuery<LoanReadySubscriptionPaginatedList, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_UNUSED_LOANREADY_SUBSCRIPTIONS],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanReady.getUnusedSubscription,
        params: {
          offset: 0,
          limit: 25
        }
      })
    },
    enabled
  })
}
