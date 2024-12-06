import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type.ts"
import { type AxiosError, type AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header.ts"
import {
  type CurrentLoansInformationResponse,
  type CurrentLoansInformationData
} from "../../constants/type.ts"
import { QUERY_KEY } from "../../constants/query-key.ts"

export const useUpdateCurrentLoanInformation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<CurrentLoansInformationResponse>,
    AxiosError<ErrorResponse>,
    CurrentLoansInformationData
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.currentLoansForm,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_CURRENT_LOANS_FORM]
      })
    }
  })
}
