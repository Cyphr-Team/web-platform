import { API_PATH } from "@/constants"
import { loanApplicationKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { type ListResponse, type PaginateParams } from "@/types/common.type"
import { type LoanApplication } from "@/types/loan-application.type"
import { customRequestHeader } from "@/utils/request-header"
import { useInfiniteQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"
import * as z from "zod"

type ListLoanApplicationResponse = ListResponse<LoanApplication>

export const LoanApplicationFilterSchema = z.object({
  status: z.array(z.object({ label: z.string(), value: z.string() })),
  programNames: z.array(z.object({ label: z.string(), value: z.string() })),
  search: z.string(),
  createdOn: z.date().optional(),
  submittedOn: z.date().optional()
})

export type LoanApplicationFilterValues = z.infer<
  typeof LoanApplicationFilterSchema
>

export interface FilterParams {
  status: string[]
  programNames: string[]
  search: string
}

type Params = PaginateParams & Partial<FilterParams>

export const useQueryListLoanApplication = ({
  limit,
  offset,
  status,
  programNames,
  search
}: Params) => {
  return useInfiniteQuery<ListLoanApplicationResponse>({
    queryKey: loanApplicationKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        search: search?.trim() ?? "",
        status: status ?? "",
        programNames: programNames ?? ""
      }).toString()
    ),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getRequest<Params, ListLoanApplicationResponse>({
        path: API_PATH.loanApplication.list,
        params: {
          limit,
          offset: (pageParam as number) * limit,
          search: search?.trim() ?? "",
          status,
          programNames
        },
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
