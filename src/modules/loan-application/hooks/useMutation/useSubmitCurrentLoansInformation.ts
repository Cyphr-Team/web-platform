import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  CurrentLoansInformation,
  CurrentLoansInformationResponse
} from "../../constants/type"
import { QUERY_KEY } from "../../constants/query-key"

export const useSubmitCurrentLoansInformation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<CurrentLoansInformationResponse>,
    AxiosError<ErrorResponse>,
    CurrentLoansInformation
  >({
    mutationFn: (data) => {
      return postRequest({
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
