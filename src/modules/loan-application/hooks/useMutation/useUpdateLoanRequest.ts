import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  UserLoanApplication,
  UserLoanApplicationRequest
} from "@/types/loan-application.type"

export const useUpdateLoanApplication = ({ id }: { id: string }) => {
  return useMutation<
    AxiosResponse<UserLoanApplication>,
    AxiosError<ErrorResponse>,
    UserLoanApplicationRequest
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.update(id),
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
