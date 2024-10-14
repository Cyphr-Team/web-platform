import { FormDetailsQueryProps } from "@/modules/loan-application/hooks/useQuery"
import { CashFlowAtAGlanceResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/useQuery/useQueryFormBySetupId.ts"

export const useQueryCashFlowAtAGlance = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) => {
  return useQueryFormBySetupId<CashFlowAtAGlanceResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_CASH_FLOW_AT_A_GLANCE, applicationId],
    enabled,
    path: API_PATH.financialProjection.forecast.cashFlowAtAGlance,
    options: {
      /**
       * Enable caching to avoid refetch
       * when useQueryCashFlowAtAGlance being use in multiple place
       * */
      refetchOnMount: false
    }
  })
}
