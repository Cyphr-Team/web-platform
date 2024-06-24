import { API_PATH } from "@/constants"
import { delRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { QUERY_KEY } from "../../constants/query-key"

export const useDeleteCurrentLoanInformation = () => {
  const queryClient = useQueryClient()

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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_CURRENT_LOANS_FORM]
      })
    }
  })
}
