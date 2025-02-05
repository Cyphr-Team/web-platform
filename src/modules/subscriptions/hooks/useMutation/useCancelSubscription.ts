import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { subscriptionKeys } from "@/constants/query-key"
import { type Subscription } from "@/modules/subscriptions/types/subscription.types"

export const useCancelSubscriptionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<Subscription>,
    AxiosError<ErrorResponse>,
    { planId: string }
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.subscriptions.cancel(data.planId)
      })
    },
    onSuccess() {
      toastSuccess(TOAST_MSG.subscription.cancel)
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.lists()
      })
    },
    onError(error) {
      toastError({
        ...TOAST_MSG.subscription.cancel,
        description: getAxiosError(error).message
      })
    }
  })
}
