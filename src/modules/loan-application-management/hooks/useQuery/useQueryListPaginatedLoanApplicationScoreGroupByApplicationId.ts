import { API_PATH } from "@/constants"
import { workspaceAdminLoanApplicationScoreKeys } from "@/constants/query-key"
import { postRequest } from "@/services/client.service"
import {
  IApplicationWithStageScoresResponse,
  IWorkspaceAdminApplicationScore
} from "@/types/application/application-assign.type"
import { ListResponse, PaginateParams, SortOrder } from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import * as z from "zod"
import { getWorkspaceAdminApplicationScores } from "../../services/score.service"

export const loanApplicationScoreFilterSchema = z.object({
  statuses: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  judgeIds: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  scoredCardStatuses: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  createdOn: z.date().optional(),
  submittedOn: z.date().optional()
})

export type LoanApplicationScoreFilterValues = z.infer<
  typeof loanApplicationScoreFilterSchema
>

type IListWorkspaceAdminApplicationScoreResponse =
  ListResponse<IApplicationWithStageScoresResponse>

type IListWorkspaceAdminApplicationScore =
  ListResponse<IWorkspaceAdminApplicationScore>

type WorkspaceAdminLoanApplicationSort = {
  submittedAt?: SortOrder
  createdAt?: SortOrder
  scoredAt?: SortOrder
  applicationIdNumber?: SortOrder
  businessName?: SortOrder
  applicationCaptureStage?: SortOrder
}

export type WorkspaceAdminListApplicationScoreParams = PaginateParams & {
  filter?: Partial<{
    statuses: string[]
    judgeIds: string[]
    scoredCardStatuses: string[]
    createdOn?: Date | undefined
    submittedOn?: Date | undefined
  }>
} & {
  searchField?: string
} & {
  sort?: WorkspaceAdminLoanApplicationSort
}

export const useQueryListPaginatedLoanApplicationScoreGroupByApplicationId = ({
  limit,
  offset,
  sort,
  filter,
  searchField
}: WorkspaceAdminListApplicationScoreParams) => {
  return useQuery<IListWorkspaceAdminApplicationScore>({
    queryKey: workspaceAdminLoanApplicationScoreKeys.list({
      limit,
      offset,
      sort,
      filter,
      searchField
    }),
    queryFn: async () => {
      const response = await postRequest<
        WorkspaceAdminListApplicationScoreParams,
        IListWorkspaceAdminApplicationScoreResponse
      >({
        path: API_PATH.loanApplicationAdmin.list(),
        data: {
          limit,
          offset,
          sort,
          filter,
          searchField
        }
      })

      return {
        ...response.data,
        data: getWorkspaceAdminApplicationScores(response.data.data)
      }
    },
    placeholderData: keepPreviousData
  })
}
