import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { type AxiosResponse } from "axios"
import {
  type SearchOrderLoanApplicationRequest,
  type SearchOrderLoanApplicationResponse
} from "@/modules/loanready/types/order-application.ts"
import { loanApplicationUserKeys } from "@/constants/query-key.ts"
import { createSearchParams } from "react-router-dom"

interface UseSearchOrderLoanApplicationsProps<T> {
  request: SearchOrderLoanApplicationRequest
  selectFn?: (data: AxiosResponse<SearchOrderLoanApplicationResponse>) => T
  options?: {
    enabled?: boolean
  }
}

function searchOrderLoanApplications(
  request: SearchOrderLoanApplicationRequest
): Promise<AxiosResponse<SearchOrderLoanApplicationResponse>> {
  return postRequest({
    path: API_PATH.users.order.listApplications,
    data: { ...request }
  })
}

export function useSearchOrderLoanApplications<
  T = AxiosResponse<SearchOrderLoanApplicationResponse>
>({
  request,
  selectFn,
  options
}: UseSearchOrderLoanApplicationsProps<T>): UseQueryResult<T> {
  return useQuery({
    queryKey: loanApplicationUserKeys.list(
      createSearchParams({
        limit: request.limit.toString(),
        offset: request.offset.toString(),
        plan: request.filter?.plan?.toString() ?? ""
      }).toString()
    ),
    queryFn: () => searchOrderLoanApplications(request),
    select: selectFn,
    enabled: options?.enabled ?? true
  })
}
