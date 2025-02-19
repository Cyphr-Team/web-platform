import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import {
  type ConfirmationForm,
  type ConfirmationFormResponse
} from "../../constants/type.ts"
import { type ErrorResponse } from "react-router-dom"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service.ts"

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
    // TODO: use QueryKeyFactory pattern to enhance performance.
    // Invalidates all query
    onSuccess: () => queryClient.invalidateQueries()
  })
}
