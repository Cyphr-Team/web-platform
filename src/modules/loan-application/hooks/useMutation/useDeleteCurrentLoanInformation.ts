import { API_PATH } from "@/constants"
import { delRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"

export const useDeleteCurentLoanInformation = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<ErrorResponse>,
    {
      id: string
    }
  >({
    mutationFn: (data) => {
      return delRequest({
        path: `${API_PATH.application.currentLoansForm}?id=${data.id}`
      })
    }
  })
}
