import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  UserLoanApplication,
  UserLoanApplicationRequest
} from "@/types/loan-application.type"

export const useCreateLoanApplication = () => {
  return useMutation<
    AxiosResponse<UserLoanApplication>,
    AxiosError<ErrorResponse>,
    UserLoanApplicationRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.create,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
