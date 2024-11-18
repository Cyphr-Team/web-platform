import { API_PATH } from "@/constants"
import { judgeLoanApplicationKeys } from "@/constants/query-key"
import { postRequest } from "@/services/client.service"
import { type JudgeLoanApplicationResponse } from "@/types/application/application-judge.type"
import { type ILaunchKCApplicationScore } from "@/types/application/application-score.type"
import {
  type ListResponse,
  type PaginateParams,
  type SortOrder
} from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import * as z from "zod"

type ListJudgeLoanApplicationResponse = ListResponse<
  JudgeLoanApplicationResponse<ILaunchKCApplicationScore>
>

export const judgeLoanApplicationFilterSchema = z.object({
  applicationCaptureStages: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  isScoreds: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional()
})

export type JudgeLoanApplicationFilterValues = z.infer<
  typeof judgeLoanApplicationFilterSchema
>

type JudgeLoanApplicationFilterKeys = keyof JudgeLoanApplicationFilterValues

export const JUDGE_APPLICATION_FILTER_KEYS: Record<
  JudgeLoanApplicationFilterKeys,
  JudgeLoanApplicationFilterKeys
> = {
  applicationCaptureStages: "applicationCaptureStages",
  isScoreds: "isScoreds"
}

interface JudeLoanApplicationSort {
  submittedAt?: SortOrder
  createdAt?: SortOrder
  scoredAt?: SortOrder
  score?: SortOrder
  applicationIdNumber?: SortOrder
  businessName?: SortOrder
  applicationCaptureStage?: SortOrder
}

export type JudgeListParams = PaginateParams & {
  filter: {
    applicationCaptureStages?: string[]
    isScoreds?: boolean[]
  }
} & {
  searchField?: string
} & {
  sort?: JudeLoanApplicationSort
}

export const useQueryListPaginateJudgeLoanApplication = ({
  limit,
  offset,
  sort,
  filter,
  searchField
}: JudgeListParams) => {
  return useQuery<ListJudgeLoanApplicationResponse>({
    queryKey: judgeLoanApplicationKeys.list({
      limit,
      offset,
      filter,
      searchField,
      sort
    }),
    queryFn: async () => {
      const baseApplicationsResponse = await postRequest<
        JudgeListParams,
        ListJudgeLoanApplicationResponse
      >({
        path: API_PATH.judgeApplication.list(),
        data: { limit, offset, filter, searchField, sort }
      })

      return baseApplicationsResponse.data
    },
    placeholderData: keepPreviousData
  })
}
