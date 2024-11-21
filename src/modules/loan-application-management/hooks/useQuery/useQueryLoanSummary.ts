import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { type LoanSummary } from "@/modules/loan-application-management/constants/types/loan-summary.type.ts"

interface UseQueryGetLoanSummaryProps {
  enabled?: boolean
  applicationId?: string
}

export const useQueryGetLoanSummary = ({
  applicationId,
  enabled = true
}: UseQueryGetLoanSummaryProps) => {
  return useQuery<LoanSummary, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_LOAN_SUMMARY, applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationDetails.getLoanSummary(applicationId!)
      })
    },
    enabled: !!applicationId && enabled
  })
}
