import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  OperatingExpensesInformation,
  OperatingExpensesInformationResponse
} from "../../constants/type"
export const useSubmitOperatingExpensesInformation = () => {
  return useMutation<
    AxiosResponse<OperatingExpensesInformationResponse>,
    AxiosError<ErrorResponse>,
    OperatingExpensesInformation
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.operatingExpensesForm,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
