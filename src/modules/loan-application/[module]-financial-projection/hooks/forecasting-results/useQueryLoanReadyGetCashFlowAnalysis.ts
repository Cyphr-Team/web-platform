import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type CashFlowAtAGlanceResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "@/types/common.type"

interface LoanReadyGetCashFlowRequest {
  applicationId: string
  from: Date
  to: Date
  enabled: boolean
}

export const useQueryLoanReadyGetCashFlowAnalysis = (
  request: LoanReadyGetCashFlowRequest
) => {
  const { applicationId, enabled, from, to } = request

  return useQuery<CashFlowAtAGlanceResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_CASH_FLOW_AT_A_GLANCE, applicationId, from, to],
    enabled: !!applicationId && enabled,
    queryFn: async () => {
      const response: AxiosResponse<CashFlowAtAGlanceResponse> =
        await postRequest({
          path: API_PATH.financialProjection.forecast.cashFlowAtAGlance,
          data: {
            appId: applicationId,
            from: from,
            to: to
          }
        })

      return response.data
    }
  })
}
