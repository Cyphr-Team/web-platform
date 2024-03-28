import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../constants/query-key"
import {
  RevenueExpenseFilters,
  RevenueAndExpenseResponse
} from "../../../constants/types/cashflow.type"

export const useQueryGetRevenueAndExpense = ({
  applicationId,
  filters
}: {
  applicationId: string
  filters: RevenueExpenseFilters
}) => {
  return useQuery<RevenueAndExpenseResponse>({
    queryKey: [QUERY_KEY.GET_REVENUE_AND_EXPENSES, applicationId, filters],
    queryFn: async () => {
      const response = await postRequest<
        RevenueExpenseFilters,
        RevenueAndExpenseResponse
      >({
        path: API_PATH.loanApplicationDetails.getRevenueExpense(applicationId),
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
