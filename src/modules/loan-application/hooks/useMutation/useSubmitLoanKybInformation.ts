import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/common"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { KYBInformation, KYBInformationResponse } from "../../constants/type"

export const useSubmitLoanKybInformation = () => {
  return useMutation<
    AxiosResponse<KYBInformationResponse>,
    AxiosError<ErrorResponse>,
    KYBInformation
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.submitKyb,
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
