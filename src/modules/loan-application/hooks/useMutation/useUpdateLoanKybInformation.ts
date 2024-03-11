import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { KYBInformation, KYBInformationResponse } from "../../constants/type"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastSuccess, toastError } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"

export const useUpdateLoanKybInformation = () => {
  return useMutation<
    AxiosResponse<KYBInformationResponse>,
    AxiosError<ErrorResponse>,
    KYBInformation
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.kybForm,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.loanApplication.submitKyb)
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.loanApplication.submitKyb,
        description: getAxiosError(error).message
      })
    }
  })
}
