import { API_PATH } from "@/constants"
import { IPlaidItemListResponse } from "@/types/plaid/response/PlaidItemListResponse"
import { QUERY_KEY } from "../../constants/query-key"
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { FormDetailsQueryProps } from "."
import { AxiosResponse } from "axios"

export const useQueryGetPlaidItemIds = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<AxiosResponse<IPlaidItemListResponse>>({
    applicationId,
    queryKey: [QUERY_KEY.GET_PLAID_ITEM_IDS],
    enabled,
    path: API_PATH.application.getPlaidItemIds
  })
