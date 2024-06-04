import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  CurrentLoansInformationResponse,
  CurrentLoansInformationData
} from "../../constants/type"
import { QUERY_KEY } from "../../constants/query-key"

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
