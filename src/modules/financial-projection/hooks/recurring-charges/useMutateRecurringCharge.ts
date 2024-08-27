import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from "@/modules/financial-projection/constants/query-key.ts"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { postRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { RecurringCharge } from "@/modules/financial-projection/types"

export const useMutateRecurringCharge = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: update, isPending: isUpdating } = useUpdate()
  const { mutateAsync: submit, isPending: isSubmitting } = useSubmit()

  /**
   * I don't use z.infer<typeof RecurringCharge> as the value because the code recommendation for
   * it is not clearly
   * */
  const mutateAsync = async (rawData: RecurringCharge) => {
    const action = rawData?.id?.length ? update : submit
    return await action(rawData, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.RECURRING_CHARGES_LIST]
        })
      },
      onError(error) {
        toastError({
          ...TOAST_MSG.financialProjection.recurringCharges.submitFail,
          description: getAxiosError(error).message
        })
      }
    })
  }

  return {
    isLoading: isUpdating || isSubmitting,
    mutateAsync
  }
}

interface SubmitRecurringChargeFormRequest extends RecurringCharge {}

const useSubmit = () => {
  return useMutation<
    AxiosResponse<RecurringCharge>,
    AxiosError<ErrorResponse>,
    SubmitRecurringChargeFormRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.financialProjection.recurringCharges.submit,
        data
      })
    }
  })
}

interface UpdateRecurringChargeFormRequest extends RecurringCharge {}

const useUpdate = () => {
  return useMutation<
    AxiosResponse<RecurringCharge>,
    AxiosError<ErrorResponse>,
    UpdateRecurringChargeFormRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.financialProjection.recurringCharges.update,
        data
      })
    }
  })
}
