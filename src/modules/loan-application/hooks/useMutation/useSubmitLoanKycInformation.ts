import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { type AxiosError, type AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  type KYCInformation,
  type KYCInformationResponse
} from "../../constants/type"

export const useSubmitLoanKycInformation = () => {
  return useMutation<
    AxiosResponse<KYCInformationResponse>,
    AxiosError<ErrorResponse>,
    KYCInformation
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.kycForm,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
