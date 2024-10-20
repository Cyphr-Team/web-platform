import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../constants/query-key"
import {
  type BalanceGraphResponse,
  type BalanceGraphsFilters,
  type FrequencyFilter
} from "../../../constants/types/cashflow.type"

export const useQueryGetBalanceGraph = ({
  applicationId,
  filters
}: {
  applicationId: string
  filters: BalanceGraphsFilters
}) => {
  return useQuery<BalanceGraphResponse>({
    queryKey: [QUERY_KEY.GET_BALANCE_GRAPH, applicationId, filters],
    queryFn: async () => {
      const response = await postRequest<FrequencyFilter, BalanceGraphResponse>(
        {
          path: API_PATH.loanApplicationDetails.getBalanceGraph(applicationId),
          data: filters,
          config: {
            params: {
              applicationId: applicationId
            }
          }
        }
      )

      return response.data
    },
    enabled: !!applicationId
  })
}
