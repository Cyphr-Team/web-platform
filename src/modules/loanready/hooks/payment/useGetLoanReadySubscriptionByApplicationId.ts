import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { type LoanReadySubscriptionList } from "@/modules/loanready/constants/types/subscription.type"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "react-router-dom"

export const useGetLoanReadySubscriptionByApplicationId = ({
  applicationId,
  enabled
}: {
  applicationId?: string
  enabled: boolean
}) => {
  return useQuery<LoanReadySubscriptionList, ErrorResponse>({
    queryKey: [
      QUERY_KEY.GET_LOANREADY_SUBSCRIPTION_BY_APPLICATION_ID,
      applicationId
    ],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanReady.getSubscriptionByApplicationId,
        params: {
          applicationId
        }
      })
    },
    enabled
  })
}
