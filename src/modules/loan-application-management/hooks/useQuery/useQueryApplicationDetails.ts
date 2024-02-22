import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { UserLoanApplication } from "@/types/loan-application.type"

export const useQueryGetApplicationDetails = ({
  applicationId
}: {
  applicationId: string
}) => {
  return useQuery<UserLoanApplication, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_DETAILS, applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.details,
        params: {
          id: applicationId
        }
      })
    },
    enabled: !!applicationId
  })
}
