import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  FinancialInformation,
  FinancialInformationResponse
} from "../../constants/type"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastSuccess, toastError } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"

export const useSubmitLoanFinancialInformation = () => {
  return useMutation<
    AxiosResponse<FinancialInformationResponse>,
    AxiosError<ErrorResponse>,
    FinancialInformation
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.submitFinancial,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.loanApplication.submitFinancial)
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.loanApplication.submitFinancial,
        description: getAxiosError(error).message
      })
    }
  })
}
