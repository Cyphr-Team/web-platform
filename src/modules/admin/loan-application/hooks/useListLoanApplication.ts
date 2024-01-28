import { ListResponse } from "@/common"
import { LoanApplication } from "@/common/loan-application.type"
import { API_PATH } from "@/constants"
import { loanApplicationKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useInfiniteQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"

interface PaginateParams {
  limit: number
  offset: number
}

type ListLoanApplicationResponse = ListResponse<LoanApplication>

const attachFakeData = (): Partial<LoanApplication> => ({
  loanAmount: Math.ceil(Math.random() * 100000),
  status: ["in progress", "flagged", "ready", "closed"][
    Math.floor(Math.random() * 3)
  ],
  progress: Math.floor(Math.random() * 100)
})

export const useListLoanApplication = ({ limit, offset }: PaginateParams) => {
  return useInfiniteQuery<ListLoanApplicationResponse>({
    queryKey: loanApplicationKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getRequest<
        PaginateParams,
        ListLoanApplicationResponse
      >({
        path: API_PATH.loanApplication.list,
        params: { limit, offset: (pageParam as number) * limit },
        customHeader: customRequestHeader.customHeaders
      })
      // TODO: Remove this when the data is finalize
      return {
        ...response,
        data: response.data.map((application) => ({
          ...application,
          ...attachFakeData()
        }))
      }
    },
    initialPageParam: 0,
    getNextPageParam(last, pages) {
      return last.total < limit ? undefined : pages.length
    }
  })
}
