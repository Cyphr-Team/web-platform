import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key.ts"
import { type ForecastResultsResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { type FormDetailsQueryOptions } from "src/modules/loan-application/hooks/form-common"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/form-common/useQueryFormBySetupId.ts"

interface QueryFinancialProjectionProps extends FormDetailsQueryOptions {
  isWorkspaceAdmin: boolean
}

export const useQueryFinancialProjectionForecast = ({
  applicationId,
  enabled,
  isWorkspaceAdmin
}: QueryFinancialProjectionProps) => {
  return useQueryFormBySetupId<ForecastResultsResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_FORECAST_DATA, applicationId],
    enabled,
    path: isWorkspaceAdmin
      ? API_PATH.financialProjection.forecast.admin
      : API_PATH.financialProjection.forecast.applicant,
    options: {
      /**
       * Enable caching to avoid refetch
       * when useQueryFinancialProjectionForecast being use in multiple place
       * */
      refetchOnMount: false
    }
  })
}
