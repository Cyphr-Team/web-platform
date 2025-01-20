import { API_PATH } from "@/constants"
import { workspaceAdminTransactionKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { postRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { RefundDecisionStatus } from "@/types/transaction.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"

export function useProceedRefund() {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<boolean>,
    AxiosError<ErrorResponse>,
    { transactionId: string; refundDecision: RefundDecisionStatus }
  >({
    mutationFn: ({ transactionId, refundDecision }) => {
      if (!transactionId) throw new Error("Missing transaction id")

      return postRequest({
        path:
          refundDecision === RefundDecisionStatus.APPROVED
            ? API_PATH.payment.refund.approve
            : API_PATH.payment.refund.reject,
        params: { paymentTransactionId: transactionId },
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      toastSuccess({
        ...TOAST_MSG.workspaceAdmin.proceedRefundSuccess,
        description: "Your refund decision has been successfully processed."
      })
      queryClient.invalidateQueries({
        queryKey: workspaceAdminTransactionKeys.lists()
      })
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.workspaceAdmin.proceedRefundError,
        description: getAxiosError(error).message
      })
    }
  })
}
