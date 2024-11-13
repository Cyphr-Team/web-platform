import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { type LoanSummary } from "../../constants/types/loan-summary.type"
import { type ILoanRequestFormValue } from "@/modules/loan-application/constants/form.ts"

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

export function reverseLoanRequestForm(
  loanSummary?: LoanSummary
): ILoanRequestFormValue {
  const loanRequestForm = loanSummary?.loanRequestForm

  if (!loanRequestForm) {
    return {
      id: "",
      applicationId: "",
      loanAmount: 0
    }
  }

  return {
    id: loanRequestForm.id,
    applicationId: loanRequestForm.applicationId,
    loanAmount: loanRequestForm.amount,
    proposeUseOfLoan: loanRequestForm.proposeUseOfLoan
  }
}
