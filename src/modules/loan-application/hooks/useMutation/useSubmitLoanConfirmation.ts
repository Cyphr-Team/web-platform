import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import {
  ConfirmationForm,
  ConfirmationFormResponse
} from "../../constants/type"
import { ErrorResponse } from "react-router-dom"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastError } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { QUERY_KEY } from "../../constants/query-key"

export const useSubmitLoanConfirmation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<ConfirmationFormResponse>,
    AxiosError<ErrorResponse>,
    ConfirmationForm
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.confirmationForm,
        data
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_LOAN_APPLICATIONS]
      })
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.loanApplication.submitConfirmation,
        description: getAxiosError(error).message
      })
    }
  })
}
