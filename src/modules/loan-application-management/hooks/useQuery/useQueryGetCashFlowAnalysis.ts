import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/query-key"
import {
  ApplicationCashFlow,
  CashFlowRequestFilters
} from "../../constants/types/cashflow.type"

export const useQueryGetCashFlowAnalysis = (
  filterParams: {
    applicationId: string
  },
  reqParams: CashFlowRequestFilters,
  enabledByInstitution: boolean
) => {
  return useQuery<ApplicationCashFlow>({
    queryKey: [QUERY_KEY.GET_CASH_FLOW_ANALYSIS, filterParams, reqParams],
    queryFn: async () => {
      const response = await postRequest<
        CashFlowRequestFilters,
        ApplicationCashFlow
      >({
        path: API_PATH.loanApplicationDetails.getCashFlow(
          filterParams.applicationId
        ),
        config: {
          params: filterParams
        },
        data: reqParams
      })
      return response.data
    },
    enabled:
      enabledByInstitution &&
      !!filterParams.applicationId &&
      !!reqParams.accountFilter?.length
  })
}
