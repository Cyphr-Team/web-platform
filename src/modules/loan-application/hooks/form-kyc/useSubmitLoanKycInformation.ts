import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service.ts"
import { useMutation } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type.ts"
import { type AxiosError, type AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header.ts"
import {
  type KYCInformation,
  type KYCInformationResponse
} from "../../constants/type.ts"

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
