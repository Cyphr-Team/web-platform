import { API_PATH } from "@/constants"
import { useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import type { ErrorResponse } from "@/types/common.type.ts"
import { getRequest } from "@/services/client.service.ts"
import { HISTORICAL_FINANCIALS_QUERY_KEY } from "@/modules/loan-application/[module]-data-enrichment/constants/query-key.ts"
import { type HistoricalStatementResponse } from "@/modules/loan-application/[module]-data-enrichment/types/historical-statements.ts"

interface QueryHistoricalStatementProps {
  applicationId: string
  enabled: boolean
  isPreview?: boolean
}

export const useQueryHistoricalStatement = ({
  applicationId,
  enabled,
  isPreview = false
}: QueryHistoricalStatementProps) => {
  return useQuery<HistoricalStatementResponse, AxiosError<ErrorResponse>>({
    queryKey: [
      HISTORICAL_FINANCIALS_QUERY_KEY.GET_HISTORICAL_FINANCIAL_STATEMENTS
    ],
    enabled: !!applicationId && enabled,
    queryFn: () =>
      getRequest({
        path: isPreview
          ? API_PATH.historicalFinancials.statements.preview(applicationId)
          : API_PATH.historicalFinancials.statements.findByApplicationId(
              applicationId
            )
      })
  })
}
