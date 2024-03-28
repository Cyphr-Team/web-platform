import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../constants/query-key"
import {
  TransactionTagsFilters,
  TransactionTagsResponse
} from "../../../constants/types/cashflow.type"

export const useQueryGetTransactionTags = ({
  applicationId,
  filters
}: {
  applicationId: string
  filters: TransactionTagsFilters
}) => {
  return useQuery<TransactionTagsResponse>({
    queryKey: [
      QUERY_KEY.GET_TRANSACTION_TAGS,
      applicationId,
      filters.accountFilter,
      filters.frequency,
      filters.timeRangeFilter
    ],
    queryFn: async () => {
      const response = await postRequest<
        TransactionTagsFilters,
        TransactionTagsResponse
      >({
        path: API_PATH.loanApplicationDetails.getTransactionTags(applicationId),
        data: filters,
        config: {
          params: {
            applicationId: applicationId
          }
        }
      })
      return response.data
    },
    enabled: !!applicationId
  })
}
