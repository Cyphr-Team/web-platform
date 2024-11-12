import { API_PATH } from "@/constants"
import { TOAST_MSG } from "@/constants/toastMsg"
import {
  type LoanReadyApplicationUpdateRequest,
  type LoanReadySubscription
} from "@/modules/loanready/constants/types/subscription.type"
import { postRequest } from "@/services/client.service"
import { toastError } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"

export const useUpdateLinkTransactionAndApplication = () => {
  return useMutation<
    AxiosResponse<LoanReadySubscription>,
    AxiosError<ErrorResponse>,
    LoanReadyApplicationUpdateRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.loanReady.linkSubscription,
        data
      })
    },
    onError: (error) => {
      toastError({
        title: TOAST_MSG.loanApplication.payment.title,
        description: getAxiosError(error).message
      })
    },
    onSuccess: () => {
      //TODO: Invalidate old application queries
    }
  })
}
