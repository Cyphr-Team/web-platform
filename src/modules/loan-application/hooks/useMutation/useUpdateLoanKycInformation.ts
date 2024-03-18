import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { KYCInformation, KYCInformationResponse } from "../../constants/type"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"

export const useUpdateLoanKycInformation = () => {
  return useMutation<
    AxiosResponse<KYCInformationResponse>,
    AxiosError<ErrorResponse>,
    KYCInformation
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.kycForm,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.loanApplication.submitKyc,
        description: getAxiosError(error).message
      })
    }
  })
}
