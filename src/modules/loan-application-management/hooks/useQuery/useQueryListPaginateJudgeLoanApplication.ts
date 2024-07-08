import { API_PATH } from "@/constants"
import { judgeLoanApplicationKeys } from "@/constants/query-key"
import { postRequest } from "@/services/client.service"
import { IJudgeLoanApplicationResponse } from "@/types/application/application-judge.type"
import { ILaunchKCApplicationScore } from "@/types/application/application-score.type"
import { ListResponse, PaginateParams } from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"

type ListJudgeLoanApplicationResponse = ListResponse<
  IJudgeLoanApplicationResponse<ILaunchKCApplicationScore>
>

type Params = PaginateParams

export const useQueryListPaginateJudgeLoanApplication = ({
  limit,
  offset
}: Params) => {
  return useQuery<ListJudgeLoanApplicationResponse>({
    queryKey: judgeLoanApplicationKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async () => {
      const baseApplicationsResponse = await postRequest<
        Params,
        ListJudgeLoanApplicationResponse
      >({
        path: API_PATH.judgeApplication.list(),
        data: { limit, offset }
      })

      return baseApplicationsResponse.data
    },
    placeholderData: keepPreviousData
  })
}
