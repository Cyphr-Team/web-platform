import { ListResponse } from "@/types/common.type"
import { API_PATH } from "@/constants"
import { loanProgramKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useInfiniteQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"
import { LoanProgram } from "@/types/loan-program.type"

interface PaginateParams {
  limit: number
  offset: number
}

type ListLoanProgramResponse = ListResponse<LoanProgram>

export const useGetListLoanProgram = ({ limit, offset }: PaginateParams) => {
  return useInfiniteQuery<ListLoanProgramResponse>({
    queryKey: loanProgramKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getRequest<
        PaginateParams,
        ListLoanProgramResponse
      >({
        path: API_PATH.loanProgram.cdfi.list(),
        params: { limit, offset: (pageParam as number) * limit },
        customHeader: customRequestHeader.customHeaders
      })
      return response
    },
    initialPageParam: 0,
    getNextPageParam(last, pages) {
      return last.data.length < limit ? undefined : pages.length
    }
  })
}
