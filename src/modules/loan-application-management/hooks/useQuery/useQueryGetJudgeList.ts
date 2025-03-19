import { useQuery } from "@tanstack/react-query"
import { type UserDetailInfo } from "../../../../types/user.type"
import { type ErrorResponse } from "react-router-dom"
import { getRequest } from "../../../../services/client.service"
import { API_PATH } from "../../../../constants"
import { workspaceAdminAssignJudge } from "../../../../constants/query-key"

interface IGetJudgeListParams {
  searchField?: string
}

export const useQueryGetJudgeList = ({ searchField }: IGetJudgeListParams) => {
  return useQuery<UserDetailInfo[], ErrorResponse>({
    queryKey: workspaceAdminAssignJudge.lists(),
    queryFn: async () => {
      return getRequest<IGetJudgeListParams, UserDetailInfo[]>({
        path: API_PATH.loanApplicationDetails.getJudges(),
        params: { searchField: searchField }
      })
    }
  })
}
