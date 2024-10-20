import { API_PATH } from "@/constants"
import { loanApplicationKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { useQuery } from "@tanstack/react-query"
import { type LoanApplicationStatus } from "@/types/loan-application.type"

export const useQueryGetLoanApplicationDetailStatus = ({
  applicationId
}: {
  applicationId?: string
}) => {
  return useQuery<LoanApplicationStatus, ErrorResponse>({
    queryKey: loanApplicationKeys.statusDetail(applicationId!),
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationDetails.getStatusDetail(applicationId!)
      })
    },
    enabled: !!applicationId
  })
}
