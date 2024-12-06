import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service.ts"
import { type ErrorResponse } from "@/types/common.type.ts"
import { type IPlaidItemListResponse } from "@/types/plaid/response/PlaidItemListResponse.ts"
import { useQuery } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type FormDetailsQueryOptions } from "../form-common"
import { QUERY_KEY } from "../../constants/query-key.ts"

export const useQueryGetPlaidItemIds = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) => {
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
