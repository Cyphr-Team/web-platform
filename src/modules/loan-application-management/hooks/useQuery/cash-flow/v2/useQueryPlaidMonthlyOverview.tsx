import { useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { postRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { customRequestHeader } from "@/utils/request-header.ts"
import { QUERY_KEY } from "@/modules/loan-application-management/constants/query-key.ts"
import type {
  ErrorResponse,
  ListResponse,
  PaginateParams,
  SortOrder
} from "@/types/common.type.ts"

interface SortParams {
  month?: SortOrder
  year?: SortOrder
  totalAmount?: SortOrder
  depositCount?: SortOrder
  nsfCount?: SortOrder
}

interface PlaidMonthlyOverviewRequest {
  request: {
    from?: string
    to?: string
    sort?: SortParams
  } & PaginateParams
}

export interface PlaidMonthlyOverview {
  month?: string
  year?: number
  totalAmount?: string
  depositCount?: number
  nsfCount?: number
  ndbCount?: number
  avgDailyBalance?: string
}

type PlaidMonthlyOverviewResponse = ListResponse<PlaidMonthlyOverview>

type QueryParams = {
  applicationId: string
} & PlaidMonthlyOverviewRequest["request"]

export const useQueryPlaidMonthlyOverview = ({
  applicationId,
  ...queryOptions
}: QueryParams) =>
  useQuery<PlaidMonthlyOverviewResponse, AxiosError<ErrorResponse>>({
    queryKey: [
      QUERY_KEY.GET_PLAID_MONTHLY_OVERVIEW,
      applicationId,
      queryOptions
    ],
    queryFn: async () => {
      const response = await postRequest<
        PlaidMonthlyOverviewRequest,
        PlaidMonthlyOverviewResponse
      >({
        path: API_PATH.capitalCollab.getPlaidMonthlyOverview(applicationId),
        customHeader: customRequestHeader.customHeaders,
        data: { request: queryOptions }
      })

      return response.data
    },
    enabled: !!applicationId
  })
