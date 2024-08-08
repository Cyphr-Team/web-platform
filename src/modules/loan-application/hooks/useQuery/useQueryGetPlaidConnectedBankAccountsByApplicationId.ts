import { API_PATH } from "@/constants"

import { postRequest } from "@/services/client.service"
import { ErrorResponse } from "@/types/common.type"
import { IPlaidConnectedBankAccountsByApplicationIdGetResponse } from "@/types/plaid/response/PlaidConnectedBankAccountsByApplicationIdGetResponse"
import { useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { QUERY_KEY } from "../../constants/query-key"
import { FormDetailsQueryProps } from "."

export const useQueryGetPlaidConnectedBankAccountsByApplicationId = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) => {
  return useQuery<
    AxiosResponse<IPlaidConnectedBankAccountsByApplicationIdGetResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      QUERY_KEY.GET_PLAID_CONNECTED_BANK_ACCOUNTS_BY_APPLICATION_ID,
      applicationId
    ],
    queryFn: () => {
      return postRequest({
        path: API_PATH.application.getPlaidConnectedBankAccountsByApplicationId,
        data: { applicationId: applicationId }
      })
    },
    enabled: enabled && !!applicationId
  })
}
