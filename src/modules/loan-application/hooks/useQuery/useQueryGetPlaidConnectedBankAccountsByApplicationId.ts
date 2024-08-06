import { API_PATH } from "@/constants"

import { IPlaidConnectedBankAccountsByApplicationIdGetResponse } from "@/types/plaid/response/PlaidConnectedBankAccountsByApplicationIdGetResponse"
import { QUERY_KEY } from "../../constants/query-key"
import { FormDetailsQueryProps } from "."
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { AxiosResponse } from "axios"

export const useQueryGetPlaidConnectedBankAccountsByApplicationId = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<
    AxiosResponse<IPlaidConnectedBankAccountsByApplicationIdGetResponse>
  >({
    applicationId,
    queryKey: [QUERY_KEY.GET_PLAID_CONNECTED_BANK_ACCOUNTS_BY_APPLICATION_ID],
    enabled,
    path: API_PATH.application.getPlaidConnectedBankAccountsByApplicationId
  })
