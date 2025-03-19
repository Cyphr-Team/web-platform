import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service.ts"
import { useInfiniteQuery } from "@tanstack/react-query"
import { type ListResponse, type PaginateParams } from "@/types/common.type.ts"
import { type UserLoanApplication } from "@/types/loan-application.type.ts"
import { loanApplicationUserKeys } from "@/constants/query-key.ts"
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
      return await getRequest<
        PaginateParams,
        ListResponse<UserLoanApplication>
      >({
        path: API_PATH.application.list,
        params: {
          limit,
          offset: (pageParam as number) * limit
        }
      })
    },
    initialPageParam: 0,
    getNextPageParam(last, pages) {
      return last.data.length < limit ? undefined : pages.length
    }
  })
}
