import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { type ILaunchKCApplicationAssignScore } from "@/types/application/application-assign.type"
import { type IApplicationScoresResponse } from "@/types/application/application-score.type"
import { type ErrorResponse } from "@/types/common.type"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/query-key"

export const useQueryScoreApplicationDetails = ({
  applicationId
}: {
  applicationId: string
}) => {
  return useQuery<
    IApplicationScoresResponse<ILaunchKCApplicationAssignScore>,
    ErrorResponse
  >({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_SCORE_DETAILS, applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationAdmin.viewJudgesScores(applicationId)
      })
    },
    enabled: !!applicationId
  })
}
