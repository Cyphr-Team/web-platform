import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ListResponse, PaginateParams } from "@/types/common.type"
import { UserLoanApplication } from "@/types/loan-application.type"
import { loanApplicationUserKeys } from "@/constants/query-key"
import { createSearchParams } from "react-router-dom"

export const useQueryGetUserLoanApplications = ({
  limit,
  offset
}: PaginateParams) => {
  return useInfiniteQuery<ListResponse<UserLoanApplication>>({
    queryKey: loanApplicationUserKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getRequest<
        PaginateParams,
        ListResponse<UserLoanApplication>
      >({
        path: API_PATH.application.list,
        params: {
          limit,
          offset: (pageParam as number) * limit
        }
      })
      return response
    },
    initialPageParam: 0,
    getNextPageParam(last, pages) {
      return last.data.length < limit ? undefined : pages.length
    }
  })
}
