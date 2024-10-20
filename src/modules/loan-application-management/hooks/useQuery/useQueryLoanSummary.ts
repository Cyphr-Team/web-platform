import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { type LoanSummary } from "../../constants/types/loan-summary.type"

export const useQueryGetLoanSummary = ({
  applicationId
}: {
  applicationId?: string
}) => {
  return useQuery<LoanSummary, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_LOAN_SUMMARY, applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationDetails.getLoanSummary(applicationId!)
      })
    },
    enabled: !!applicationId
  })
}
