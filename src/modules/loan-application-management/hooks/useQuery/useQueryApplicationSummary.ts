import { skipToken, useQuery } from "@tanstack/react-query"
import { type ApplicationSummary } from "@/modules/loan-application-management/constants/types/loan-summary.type.ts"
import type { ErrorResponse } from "@/types/common.type.ts"
import { QUERY_KEY } from "@/modules/loan-application-management/constants/query-key.ts"
import { getRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"

interface UseQueryGetApplicationSummaryProps {
  enabled?: boolean
  applicationId?: string
}

/**
 * This API is used with FormV2 is ON.
 */
export const useQueryGetApplicationSummary = ({
  applicationId,
  enabled = false
}: UseQueryGetApplicationSummaryProps) => {
  return useQuery<ApplicationSummary, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_APPLICATION_SUMMARY, applicationId],
    queryFn:
      applicationId && enabled
        ? () => {
            return getRequest({
              path: API_PATH.loanApplicationLender.getApplicationSummary(
                applicationId
              )
            })
          }
        : skipToken
  })
}
