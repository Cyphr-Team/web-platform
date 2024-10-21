import { API_PATH } from "@/constants"

import { postRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { type IPlaidConnectedBankAccountsByApplicationIdGetResponse } from "@/types/plaid/response/PlaidConnectedBankAccountsByApplicationIdGetResponse"
import { useQuery } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { QUERY_KEY } from "../../constants/query-key"
import { type FormDetailsQueryProps } from "."
import { isEnablePlaidV2 } from "@/utils/feature-flag.utils"

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
        path: isEnablePlaidV2()
          ? API_PATH.application.getPlaidConnectedBankAccountsByApplicationIdV2
          : API_PATH.application.getPlaidConnectedBankAccountsByApplicationId,
        data: { applicationId: applicationId }
      })
    },
    enabled: enabled && !!applicationId
  })
}
