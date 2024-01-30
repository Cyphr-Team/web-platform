import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { LoanApplicationsKyb } from "../../constants/type"
import { ErrorResponse } from "@/common"
import { QUERY_KEY } from "../../constants/query-key"

export const useQueryGetKyb = ({
  applicationId
}: {
  applicationId: string
}) => {
  return useQuery<LoanApplicationsKyb, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_KYB, applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationDetails.getKYB(applicationId)
      })
    },
    enabled: !!applicationId
  })
}
