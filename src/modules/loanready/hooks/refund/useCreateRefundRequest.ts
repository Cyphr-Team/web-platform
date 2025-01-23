import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toastError, toastSuccess } from "@/utils"
import { loanReadyTransactionKeys } from "@/constants/query-key"

interface CreateRefundRequestPayload {
  paymentTransactionId: string
  refundReason: string
}

const useCreateRefundRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRefundRequestPayload) =>
      postRequest({
        path: API_PATH.loanReady.createRefundRequest,
        data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: loanReadyTransactionKeys.lists()
      })
      toastSuccess({
        title: "Refund request sent",
        description: "Refund request has been sent successfully"
      })
    },
    onError: () => {
      toastError({
        title: "Refund request failed",
        description: "Failed to send refund request"
      })
    }
  })
}

export default useCreateRefundRequest
