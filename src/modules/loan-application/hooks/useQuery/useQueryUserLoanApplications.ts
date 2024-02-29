import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ListResponse, PaginateParams } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { UserLoanApplication } from "@/types/loan-application.type"

export const useQueryGetUserLoanApplications = ({
  limit,
  offset
}: PaginateParams) => {
  return useInfiniteQuery<ListResponse<UserLoanApplication>>({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATIONS, { limit, offset }],
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
