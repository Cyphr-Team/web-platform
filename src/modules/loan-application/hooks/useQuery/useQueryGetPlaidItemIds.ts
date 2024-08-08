import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { ErrorResponse } from "@/types/common.type"
import { IPlaidItemListResponse } from "@/types/plaid/response/PlaidItemListResponse"
import { useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { FormDetailsQueryProps } from "."
import { QUERY_KEY } from "../../constants/query-key"

export const useQueryGetPlaidItemIds = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) => {
  return useQuery<
    AxiosResponse<IPlaidItemListResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [QUERY_KEY.GET_PLAID_ITEM_IDS, applicationId],
    queryFn: () => {
      return postRequest({
        path: API_PATH.application.getPlaidItemIds,
        data: { applicationId: applicationId }
      })
    },
    enabled: enabled && !!applicationId
  })
}
