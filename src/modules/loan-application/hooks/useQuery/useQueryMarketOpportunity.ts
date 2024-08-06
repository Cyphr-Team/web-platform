import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key"
import { MarketOpportunityFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/market-opportunity/type.ts"
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { FormDetailsQueryProps } from "."

export const useQueryMarketOpportunity = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<MarketOpportunityFormResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_MARKET_OPPORTUNITY],
    enabled,
    path: API_PATH.application.marketOpportunity.detail
  })
