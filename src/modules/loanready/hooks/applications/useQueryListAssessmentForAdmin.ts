import type {
  ListResponse,
  PaginateParams,
  SortOrder
} from "@/types/common.type.ts"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { workspaceAdminLoanReadyAssessmentKeys } from "@/constants/query-key.ts"
import { postRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { type AssessmentResponse } from "@/modules/loanready/types/assessment.ts"

type IListWorkspaceAdminAssessmentResponse = ListResponse<AssessmentResponse>

interface WorkspaceAdminLoanReadyAssessmentSort {
  scoreLevel?: SortOrder
  applicationIdNumber?: SortOrder
  businessName?: SortOrder
  email?: SortOrder
  status?: SortOrder
  createdAt?: SortOrder
  submittedAt?: SortOrder
}

export type WorkspaceAdminListAssessmentParams = PaginateParams & {
  filter?: Partial<{
    scores: string[]
    statuses: string[]
    plan: string[]
    createdOn?: Date | undefined
    submittedOn?: Date | undefined
  }>
} & {
  businessName?: string
} & {
  sort?: WorkspaceAdminLoanReadyAssessmentSort
}

export const useQueryListAssessmentForAdmin = ({
  limit,
  offset,
  sort,
  filter,
  businessName
}: WorkspaceAdminListAssessmentParams) => {
  return useQuery<IListWorkspaceAdminAssessmentResponse>({
    queryKey: workspaceAdminLoanReadyAssessmentKeys.list({
      limit,
      offset,
      sort,
      filter,
      businessName
    }),
    queryFn: async () => {
      const response = await postRequest<
        WorkspaceAdminListAssessmentParams,
        IListWorkspaceAdminAssessmentResponse
      >({
        path: API_PATH.loanReadyAssessmentAdmin.list(),
        data: {
          limit,
          offset,
          sort,
          filter,
          businessName
        }
      })

      return response.data
    },
    placeholderData: keepPreviousData
  })
}
