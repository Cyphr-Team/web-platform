import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  CurrentLoanInformation,
  CurrentLoanInformationResponse
} from "../../constants/type"

export const useUpdateCurrentLoanInformation = () => {
  return useMutation<
    AxiosResponse<CurrentLoanInformationResponse>,
    AxiosError<ErrorResponse>,
    CurrentLoanInformation
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.currentLoansForm,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
