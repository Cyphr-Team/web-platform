import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ConfirmationFormResponse } from "../../constants/type"
import { AxiosError } from "axios"
import { ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/query-key"
import { API_PATH } from "@/constants"

export const useQueryGetConfirmationForm = (loanApplicationId: string) => {
  return useQuery<ConfirmationFormResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_CONFIRMATION_FORM, loanApplicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.confirmationForm,
        params: { applicationId: loanApplicationId }
      })
    },
    enabled: !!loanApplicationId
  })
}
