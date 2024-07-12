import { API_PATH } from "@/constants"
import { workspaceAdminLoanApplicationScoreKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import {
  IWorkspaceAdminApplicationScore,
  IApplicationWithStageScoresResponse
} from "@/types/application/application-assign.type"
import { ListResponse, PaginateParams } from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"
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
    queryKey: workspaceAdminLoanApplicationScoreKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
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
