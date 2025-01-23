import { API_PATH } from "@/constants"
import { loanReadyTransactionKeys } from "@/constants/query-key"
import { postRequest } from "@/services/client.service"
import {
  type SortOrder,
  type ListResponse,
  type PaginateParams
} from "@/types/common.type"
import { type Transaction } from "@/types/transaction.type"
import { customRequestHeader } from "@/utils/request-header"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import * as z from "zod"

type ListTransactionResponse = ListResponse<Transaction>

export const enum FormFieldNames {
  STATUS = "status",
  SEARCH = "search",
  PRODUCT = "product",
  PAID_ON = "paidOn"
}

export const TransactionFilterSchema = z.object({
  status: z.array(z.object({ label: z.string(), value: z.string() })),
  search: z.string(),
  product: z.array(z.object({ label: z.string(), value: z.string() })),
  paidOn: z.array(z.object({ label: z.string(), value: z.string() }))
})

export type TransactionFilterValues = z.infer<typeof TransactionFilterSchema>

interface BaseTransactionSort {
  email?: SortOrder
  amount?: SortOrder
  paidOn?: SortOrder
  status?: SortOrder
}

interface LoanReadyTransactionSort extends BaseTransactionSort {
  companyName?: SortOrder
  product?: SortOrder
}

export type TransactionSort = LoanReadyTransactionSort

interface FilterParams {
  status?: string[]
  product?: string[]
  paidOn?: string[]
}

export type ListTransactionParams = PaginateParams & {
  filter?: Partial<FilterParams>
} & { searchField?: string; sort?: TransactionSort; isApplicant?: boolean }

export const useQueryListPaginateTransaction = ({
  limit,
  offset,
  sort,
  filter,
  searchField,
  isApplicant = false
}: ListTransactionParams) => {
  return useQuery<ListTransactionResponse>({
    queryKey: loanReadyTransactionKeys.list({
      limit,
      offset,
      sort,
      filter,
      searchField
    }),
    queryFn: async () => {
      const response = await postRequest<
        ListTransactionParams,
        ListTransactionResponse
      >({
        path: isApplicant
          ? API_PATH.payment.applicantList
          : API_PATH.payment.adminList,
        data: {
          limit,
          offset,
          searchField: searchField?.trim() ?? "",
          sort,
          filter
        },
        customHeader: customRequestHeader.customHeaders
      })

      return response.data
    },
    placeholderData: keepPreviousData
  })
}
