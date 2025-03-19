import { useQuery } from "@tanstack/react-query"
import { type UserDetailInfo } from "../../../../types/user.type"
import { type ErrorResponse } from "react-router-dom"
import { getRequest } from "../../../../services/client.service"
import { API_PATH } from "../../../../constants"
import { workspaceAdminAssignJudge } from "../../../../constants/query-key"

export const useQueryGetAssignableJudgeList = ({
  applicationId,
  searchString,
  enabled
}: {
  applicationId: string
  searchString?: string
  enabled: boolean
}) => {
  return useQuery<UserDetailInfo[], ErrorResponse>({
    queryKey: workspaceAdminAssignJudge.assignableJudges(applicationId),
    queryFn: async () => {
      return getRequest<
        { applicationId: string; searchString?: string },
        UserDetailInfo[]
      >({
        path: API_PATH.loanApplicationDetails.getAssignableJudges(),
        params: { applicationId: applicationId, searchString: searchString }
      })
    },
    enabled: enabled
  })
}
