import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { type AxiosError, type AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  type CurrentLoansInformation,
  type CurrentLoansInformationResponse
} from "../../constants/type"

export const useSubmitCurrentLoansInformation = () => {
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
    }
  })
}
