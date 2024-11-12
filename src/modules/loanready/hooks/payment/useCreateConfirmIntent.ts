import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"

import {
  type PaymentCreateChargeConfirmationTokenRequest,
  type PaymentTransactionResponse
} from "@/modules/loanready/constants/types/payment.type"
import useBoolean from "@/hooks/useBoolean"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { TOAST_MSG } from "@/constants/toastMsg"
import { loanApplicationKeys } from "@/constants/query-key"

export const useCreateConfirmIntent = () => {
  const queryClient = useQueryClient()
  const isLoading = useBoolean(false)

  const mutateAsync = useMutation<
    AxiosResponse<PaymentTransactionResponse>,
    AxiosError<ErrorResponse>,
    PaymentCreateChargeConfirmationTokenRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.payment.createChargeWithConfirmationToken,
        data
      })
    },
    onError: (error) => {
      toastError({
        title: TOAST_MSG.loanApplication.payment.title,
        description: getAxiosError(error).message
      })
      isLoading.onFalse()
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.loanApplication.payment)
      isLoading.onFalse()
      queryClient.invalidateQueries({ queryKey: loanApplicationKeys.lists() })
    }
  })

  return {
    mutateAsync,
    isLoading
  }
}
