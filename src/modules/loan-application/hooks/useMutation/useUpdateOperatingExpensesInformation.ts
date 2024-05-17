import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  OperatingExpensesInformation,
  OperatingExpensesInformationResponse
} from "../../constants/type"

export const useUpdateOperatingExpensesInformation = () => {
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
    }
  })
}
