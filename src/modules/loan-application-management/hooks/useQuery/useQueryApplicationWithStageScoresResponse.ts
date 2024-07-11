import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "react-router-dom"
import { getRequest } from "../../../../services/client.service"
import { API_PATH } from "../../../../constants"
import { workspaceAdminAssignJudge } from "../../../../constants/query-key"
import { IApplicationWithStageScoresResponse } from "../../../../types/application/application-assign.type"

export const useQueryApplicationWithStageScoresResponse = ({
  applicationId,
  enabled
}: {
  applicationId: string
  enabled: boolean
}) => {
  return useQuery<IApplicationWithStageScoresResponse, ErrorResponse>({
    queryKey: [
      workspaceAdminAssignJudge.getApplicationWithStageScoresResponse(
        applicationId
      )
    ],
    queryFn: async () => {
      const result = await getRequest<
        { applicationId: string },
        IApplicationWithStageScoresResponse
      >({
        path: API_PATH.loanApplicationDetails.getApplicationWithStageScoresResponse(),
        params: { applicationId: applicationId }
      })
      return result
    },
    enabled: enabled
  })
}
