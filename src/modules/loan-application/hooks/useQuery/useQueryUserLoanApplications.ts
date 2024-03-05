import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ListResponse, PaginateParams } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { UserLoanApplication } from "@/types/loan-application.type"

export const useQueryGetUserLoanApplications = ({
  limit,
  offset
}: PaginateParams) => {
  const getLoanApplications = ({
    pageParam = 0
  }: {
    pageParam?: number
  }): Promise<ListResponse<UserLoanApplication>> =>
    postRequest<PaginateParams, ListResponse<UserLoanApplication>>({
      path: API_PATH.application.list,
      data: {
        limit,
        offset: pageParam * limit
      }
    }).then((res) => res.data)

  return useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATIONS, { limit, offset }],
    queryFn: ({ pageParam = 0 }) => getLoanApplications({ pageParam }),
    initialPageParam: 0,
    getNextPageParam(last, pages) {
      return last.data.length < limit ? undefined : pages.length
    }
  })
}
