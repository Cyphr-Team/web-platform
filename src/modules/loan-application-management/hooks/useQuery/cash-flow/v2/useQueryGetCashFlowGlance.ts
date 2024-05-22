import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import {
  BaseCashFlowFilters,
  CashFlowGlanceResponse
} from "@/modules/loan-application-management/constants/types/v2/cashflow.type"
import { QUERY_KEY } from "@/modules/loan-application-management/constants/query-key"

export const useQueryGetCashFlowGlance = ({
  applicationId,
  filters,
  enabledByInstitution
}: {
  applicationId: string
  filters: BaseCashFlowFilters
  enabledByInstitution: boolean
}) => {
  return useQuery<CashFlowGlanceResponse>({
    queryKey: [QUERY_KEY.GET_CASH_FLOW_GLANCE_V2, applicationId, filters],
    queryFn: async () => {
      const response = await postRequest<
        BaseCashFlowFilters,
        CashFlowGlanceResponse
      >({
        path: API_PATH.loanApplicationDetails.getCashFlowGlanceV2(
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
    enabled: enabledByInstitution && !!applicationId
  })
}
