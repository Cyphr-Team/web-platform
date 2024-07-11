import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import {
  IApplicationScoresResponse,
  ILaunchKCApplicationScore
} from "@/types/application/application-score.type"

export const useQueryScoreApplicationDetails = ({
  applicationId
}: {
  applicationId: string
}) => {
  return useQuery<
    IApplicationScoresResponse<ILaunchKCApplicationScore>,
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
