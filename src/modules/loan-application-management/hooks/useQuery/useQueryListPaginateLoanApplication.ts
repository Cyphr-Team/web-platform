import { API_PATH } from "@/constants"
import { loanApplicationKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { ListResponse, PaginateParams } from "@/types/common.type"
import { customRequestHeader } from "@/utils/request-header"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"
import * as z from "zod"
import { LoanApplicationResponse } from "@/types/application/application-assign.type.ts"

type ListLoanApplicationResponse<T> = ListResponse<LoanApplicationResponse<T>>

export const LoanApplicationFilterSchema = z.object({
  status: z.array(z.object({ label: z.string(), value: z.string() })),
  search: z.string(),
  programNames: z.array(z.object({ label: z.string(), value: z.string() }))
})
export type FilterParams = {
  status: string[]
  search: string
  programNames: string[]
}

type Params = PaginateParams & Partial<FilterParams>

export const useQueryListPaginateLoanApplication = <T>({
  limit,
  offset,
  status,
  search,
  programNames
}: Params) => {
  return useQuery<ListLoanApplicationResponse<T>>({
    queryKey: loanApplicationKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        search: search?.trim() ?? "",
        status: status ?? "",
        programNames: programNames ?? ""
      }).toString()
    ),
    queryFn: async () => {
      const response = await getRequest<Params, ListLoanApplicationResponse<T>>(
        {
          path: API_PATH.loanApplication.list,
          params: {
            limit,
            offset,
            search: search?.trim() ?? "",
            status,
            programNames
          },
          customHeader: customRequestHeader.customHeaders
        }
      )
      return response
    },
    placeholderData: keepPreviousData
  })
}
