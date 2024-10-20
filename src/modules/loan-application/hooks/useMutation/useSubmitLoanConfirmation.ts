import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import {
  type ConfirmationForm,
  type ConfirmationFormResponse
} from "../../constants/type"
import { type ErrorResponse } from "react-router-dom"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { loanApplicationUserKeys } from "@/constants/query-key"

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
        queryKey: loanApplicationUserKeys.lists()
      })
    }
  })
}
