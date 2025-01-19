import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { toastError, toastSuccess } from "@/utils"

interface CreateRefundRequestPayload {
  loanReadySubscriptionId: string
  refundReason: string
}

const useCreateRefundRequest = () => {
  return useMutation({
    mutationFn: (data: CreateRefundRequestPayload) =>
      postRequest({
        path: API_PATH.loanReady.createRefundRequest,
        data
      }),
    onSuccess: () => {
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
