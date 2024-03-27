import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorResponse, SuccessResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { loanApplicationKeys } from "@/constants/query-key"

export const useReviewLoanApplication = (applicationId: string) => {
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<SuccessResponse>, AxiosError<ErrorResponse>>(
    {
      mutationFn: () => {
        return putRequest({
          path: API_PATH.loanApplication.reviewLoanApplication(applicationId),
          customHeader: customRequestHeader.customHeaders
        })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: loanApplicationKeys.lists() })
      }
    }
  )
}
