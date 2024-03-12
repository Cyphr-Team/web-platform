import { API_PATH } from "@/constants"
import { loanApplicationKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { ListResponse, PaginateParams } from "@/types/common.type"
import { LoanApplication } from "@/types/loan-application.type"
import { customRequestHeader } from "@/utils/request-header"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"
import * as z from "zod"

type ListLoanApplicationResponse = ListResponse<LoanApplication>

export const LoanApplicationFilterSchema = z.object({
  status: z.array(z.object({ label: z.string(), value: z.string() })),
  type: z.array(z.object({ label: z.string(), value: z.string() })),
  search: z.string()
})

export type LoanApplicationFilterValues = z.infer<
  typeof LoanApplicationFilterSchema
>

export type FilterParams = {
  status: string[]
  type: string[]
  search: string
}

type Params = PaginateParams & Partial<FilterParams>

export const useQueryListPaginateLoanApplication = ({
  limit,
  offset,
  status,
  type,
  search
}: Params) => {
  return useQuery<ListLoanApplicationResponse>({
    queryKey: loanApplicationKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        search: search ?? "",
        status: status ?? "",
        type: type ?? ""
      }).toString()
    ),
    queryFn: async () => {
      const response = await getRequest<Params, ListLoanApplicationResponse>({
        path: API_PATH.loanApplication.list,
        params: {
          limit,
          offset,
          search,
          status,
          type
        },
        customHeader: customRequestHeader.customHeaders
      })
      return response
    },
    placeholderData: keepPreviousData
  })
}
