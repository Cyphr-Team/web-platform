import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { type LoanReadySubscription } from "@/modules/loanready/constants/types/subscription.type"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"

export const useGetLoanReadySubscription = ({
  paymentTransactionId,
  enabled
}: {
  paymentTransactionId?: string
  enabled: boolean
}) => {
  return useQuery<AxiosResponse<LoanReadySubscription>, ErrorResponse>({
    queryKey: [
      QUERY_KEY.GET_LOANREADY_SUBSCRIPTION_BY_PAYMENT_TRANSACTION_ID,
      paymentTransactionId
    ],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanReady.getSubscriptionByPaymentTransactionId,
        params: {
          paymentTransactionId
        }
      })
    },
    enabled
  })
}
