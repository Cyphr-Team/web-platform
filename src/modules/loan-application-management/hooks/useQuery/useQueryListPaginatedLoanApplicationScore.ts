import { API_PATH } from "@/constants"
import { workspaceAdminLoanApplicationScoreKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import {
  type IApplicationWithStageScoresResponse,
  type IWorkspaceAdminApplicationScore
} from "@/types/application/application-assign.type"
import { type ListResponse, type PaginateParams } from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getWorkspaceAdminApplicationScores } from "../../services/score.service"

type IListWorkspaceAdminApplicationScoreResponse =
  ListResponse<IApplicationWithStageScoresResponse>

type IListWorkspaceAdminApplicationScore =
  ListResponse<IWorkspaceAdminApplicationScore>

type Params = PaginateParams

export const useQueryListPaginatedLoanApplicationScore = ({
  limit,
  offset
}: Params) => {
  return useQuery<IListWorkspaceAdminApplicationScore>({
    queryKey: workspaceAdminLoanApplicationScoreKeys.list({
      limit,
      offset
    }),
    queryFn: async () => {
      const response = await getRequest<
        Params,
        IListWorkspaceAdminApplicationScoreResponse
      >({
        path: API_PATH.loanApplicationAdmin.list(),
        params: {
          limit,
          offset
        }
      })

      return {
        ...response,
        data: getWorkspaceAdminApplicationScores(response.data)
      }
    },
    placeholderData: keepPreviousData
  })
}
