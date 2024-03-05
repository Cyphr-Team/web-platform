import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { ErrorResponse } from "@/types/common.type"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/query-key"
import { ApplicationKybDetailResponse } from "../../constants/types/business.type"

export const useQueryGetKyb = ({
  applicationId
}: {
  applicationId: string
}) => {
  return useQuery<ApplicationKybDetailResponse, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_KYB, applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationDetails.getKYB(applicationId)
      })
    },
    enabled: !!applicationId
  })
}
