import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { LoanApplicationsKyc } from "../../constants/types/kyc"

export const useQueryGetKyc = ({
  applicationId
}: {
  applicationId: string
}) => {
  return useQuery<LoanApplicationsKyc, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_KYC, applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationDetails.getKYC(applicationId)
      })
    },
    enabled: !!applicationId
  })
}
