import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/common"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { LoanApplication } from "@/common/loan-application.type"
import { ConfirmationFormValue } from "../constants/form"

export const useCreateLoanApplication = () => {
  return useMutation<
    AxiosResponse<LoanApplication>,
    AxiosError<ErrorResponse>,
    ConfirmationFormValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.create,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: ({ data }) => {
      // TODO: Clean after demo notification
      localStorage.setItem("DEMO_NOTIFICATION", JSON.stringify([data]))
    }
  })
}
