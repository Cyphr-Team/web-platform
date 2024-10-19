import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import {
  type NoiTotalDebtPaymentFilters,
  type NoiVsTotalDebtPaymentGraphResponse
} from "@/modules/loan-application-management/constants/types/v2/cashflow.type"
import { QUERY_KEY } from "@/modules/loan-application-management/constants/query-key"

export const useQueryGetNoiTotalDebtPaymentGraph = ({
  applicationId,
  filters
}: {
  applicationId: string
  filters: NoiTotalDebtPaymentFilters
}) => {
  return useQuery<NoiVsTotalDebtPaymentGraphResponse>({
    queryKey: [QUERY_KEY.GET_NOI_TOTAL_DEBT_PAYMENT_V2, applicationId, filters],
    queryFn: async () => {
      const response = await postRequest<
        NoiTotalDebtPaymentFilters,
        NoiVsTotalDebtPaymentGraphResponse
      >({
        path: API_PATH.loanApplicationDetails.getCashFlowNoiVsTotalDebtPaymentGraph(
          applicationId
        ),
        data: filters,
        config: {
          params: {
            applicationId: applicationId
          }
        }
      })

      return response.data
    },
    enabled: !!applicationId
  })
}
