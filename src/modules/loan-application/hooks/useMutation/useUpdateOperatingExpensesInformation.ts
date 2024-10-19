import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { type AxiosError, type AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  type OperatingExpensesInformation,
  type OperatingExpensesInformationResponse
} from "../../constants/type"
import { QUERY_KEY } from "../../constants/query-key"

export const useUpdateOperatingExpensesInformation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<OperatingExpensesInformationResponse>,
    AxiosError<ErrorResponse>,
    OperatingExpensesInformation
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.operatingExpensesForm,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_OPERATING_EXPENSES_FORM]
      })
    }
  })
}
