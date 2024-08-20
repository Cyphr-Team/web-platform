import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import * as z from "zod"
import { TransactionalMarketplaceRevenue } from "@/modules/financial-projection/types"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { QUERY_KEY } from "@/modules/financial-projection/constants/query-key.ts"
import { getAxiosError } from "@/utils/custom-error.ts"

export const submitTransactionMarketplaceRevenueFormSchema = z.object({
  id: z.string().optional(),
  financialProjectionId: z.string().optional(),
  newCustomerRate: z
    .number()
    .gt(0, { message: "New customer rate must be greater than 0" }),
  returnCustomerRate: z
    .number()
    .gt(0, { message: "Return customer rate must be greater than 0" }),
  averageMonthlyTransactionPerCustomer: z.number().gt(0, {
    message: "Average monthly transaction per customer must be greater than 0"
  }),
  averageTransactionSize: z.number().gt(0, {
    message: "Average transaction size must be greater than 0"
  }),
  takeRate: z.number().gt(0, { message: "Take rate must be greater than 0" })
})

export const useMutateTransactionalMarketplaceRevenue = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: update, isPending: isUpdating } = useUpdate()
  const { mutateAsync: submit, isPending: isSubmitting } = useSubmit()

  /**
   * I don't use z.infer<typeof TransactionalMarketplaceRevenue> as the value because the code recommendation for
   * it is not clearly
   * */
  const mutateAsync = async (rawData: TransactionalMarketplaceRevenue) => {
    const action = rawData?.id?.length ? update : submit
    return await action(rawData, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.TRANSACTIONAL_MARKETPLACE_REVENUE]
        })
      },
      onError(error) {
        toastError({
          ...TOAST_MSG.financialProjection.transactionalMarketplaceRevenue
            .submitFail,
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

interface SubmitTransactionalMarketplaceRevenueFormRequest
  extends TransactionalMarketplaceRevenue {}

const useSubmit = () => {
  return useMutation<
    AxiosResponse<TransactionalMarketplaceRevenue>,
    AxiosError<ErrorResponse>,
    SubmitTransactionalMarketplaceRevenueFormRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.financialProjection.revenueTransactional.submit,
        data
      })
    }
  })
}

interface UpdateTransactionalMarketplaceRevenueFormRequest
  extends TransactionalMarketplaceRevenue {}

const useUpdate = () => {
  return useMutation<
    AxiosResponse<TransactionalMarketplaceRevenue>,
    AxiosError<ErrorResponse>,
    UpdateTransactionalMarketplaceRevenueFormRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.financialProjection.revenueTransactional.update,
        data
      })
    }
  })
}
