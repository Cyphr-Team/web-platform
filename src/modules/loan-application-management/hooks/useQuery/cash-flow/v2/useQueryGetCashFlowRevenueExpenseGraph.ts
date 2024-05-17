import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import {
  RevenueExpenseFilters,
  RevenueExpenseGraphResponse
} from "@/modules/loan-application-management/constants/types/v2/cashflow.type"
import { QUERY_KEY } from "@/modules/loan-application-management/constants/query-key"

export const useQueryGetRevenueExpenseGraph = ({
  applicationId,
  filters
}: {
  applicationId: string
  filters: RevenueExpenseFilters
}) => {
  return useQuery<RevenueExpenseGraphResponse>({
    queryKey: [QUERY_KEY.GET_REVENUE_AND_EXPENSES_V2, applicationId, filters],
    queryFn: async () => {
      const response = await postRequest<
        RevenueExpenseFilters,
        RevenueExpenseGraphResponse
      >({
        path: API_PATH.loanApplicationDetails.getCashFlowRevenueVsExpenseGraph(
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
