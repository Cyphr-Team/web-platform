import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import {
  type BaseCashFlowFilters,
  type CashFlowGlanceResponse
} from "@/modules/loan-application-management/constants/types/v2/cashflow.type"
import { QUERY_KEY } from "@/modules/loan-application-management/constants/query-key"
import { isCapitalCollab } from "@/utils/domain.utils"

export const useQueryGetCashFlowGlance = ({
  applicationId,
  filters,
  enabledByInstitution
}: {
  applicationId: string
  filters: BaseCashFlowFilters
  enabledByInstitution: boolean
}) => {
  const getQueryPath = (applicationId: string) => {
    if (isCapitalCollab()) {
      return API_PATH.loanApplicationDetails.capitalCollabCashFlow.getCashFlow(
        applicationId
      )
    }

    return API_PATH.loanApplicationDetails.getCashFlowGlanceV2(applicationId)
  }

  return useQuery<CashFlowGlanceResponse>({
    queryKey: [QUERY_KEY.GET_CASH_FLOW_GLANCE_V2, applicationId, filters],
    queryFn: async () => {
      const response = await postRequest<
        BaseCashFlowFilters,
        CashFlowGlanceResponse
      >({
        path: getQueryPath(applicationId),
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
