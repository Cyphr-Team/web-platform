import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service.ts"
import { useMutation } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type.ts"
import { type AxiosError, type AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header.ts"
import {
  type CurrentLoansInformation,
  type CurrentLoansInformationResponse
} from "../../constants/type.ts"

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
