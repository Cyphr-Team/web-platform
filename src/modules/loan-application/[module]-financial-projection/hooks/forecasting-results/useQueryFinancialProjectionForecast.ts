import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key.ts"
import { type ForecastResultsResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { type FormDetailsQueryProps } from "@/modules/loan-application/hooks/useQuery"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/useQuery/useQueryFormBySetupId.ts"

interface QueryFinancialProjectionProps extends FormDetailsQueryProps {
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
