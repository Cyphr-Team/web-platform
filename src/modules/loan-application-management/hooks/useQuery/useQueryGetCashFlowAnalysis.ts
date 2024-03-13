import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { ApplicationCashFlow } from "../../constants/types/cashflow.type"

export const useQueryGetCashFlowAnalysis = ({
  applicationId
}: {
  applicationId: string
}) => {
  return useQuery<ApplicationCashFlow, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_CASH_FLOW_ANALYSIS, applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationDetails.getCashFlow(applicationId)
      })
    },
    enabled: !!applicationId
  })
}
