import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"

import { IPlaidConnectedBankAccountsByApplicationIdGetResponse } from "@/types/plaid/response/PlaidConnectedBankAccountsByApplicationIdGetResponse"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/query-key"
import { useQuery } from "@tanstack/react-query"

export const useQueryGetPlaidConnectedBankAccountsByApplicationId = (
  appId: string
) => {
  return useQuery<
    AxiosResponse<IPlaidConnectedBankAccountsByApplicationIdGetResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      QUERY_KEY.GET_PLAID_CONNECTED_BANK_ACCOUNTS_BY_APPLICATION_ID,
      appId
    ],
    queryFn: () => {
      return postRequest({
        path: API_PATH.application.getPlaidConnectedBankAccountsByApplicationId,
        data: { applicationId: appId }
      })
    },
    enabled: !!appId
  })
}
