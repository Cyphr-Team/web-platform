import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { QUERY_KEY } from "../../constants/query-key"
import { AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { MarketOpportunityFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/market-opportunity/type.ts"

export const useQueryMarketOpportunity = (id: string) => {
  return useQuery<MarketOpportunityFormResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_MARKET_OPPORTUNITY, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.marketOpportunity.detail,
        params: { applicationId: id }
      })
    },
    enabled: !!id
  })
}
