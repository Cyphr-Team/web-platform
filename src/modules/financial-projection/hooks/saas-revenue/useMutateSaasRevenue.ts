import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from "@/modules/financial-projection/constants/query-key.ts"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { postRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { SaasRevenue } from "@/modules/financial-projection/types"

export const submitSaasRevenueFormSchema = z.object({
  id: z.string().optional(),
  financialProjectionId: z.string().optional(),
  totalNewCustomerRate: z
    .number()
    .gt(0, "Total new customer rate must be greater than 0"),
  churnRate: z.number().gt(0, "Churn rate must be greater than 0"),
  monthlyPrice: z.number().gt(0, "Monthly price must be greater than 0"),
  startingDate: z.string().min(1, "Starting date is required."),
  endDate: z.string().min(1, "End date is required.")
})

export const useMutateSaasRevenue = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: update, isPending: isUpdating } = useUpdate()
  const { mutateAsync: submit, isPending: isSubmitting } = useSubmit()

  /**
   * I don't use z.infer<typeof SaasRevenue> as the value because the code recommendation for
   * it is not clearly
   * */
  const mutateAsync = async (rawData: SaasRevenue) => {
    const action = rawData?.id?.length ? update : submit
    return await action(rawData, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.SAAS_REVENUE_LIST]
        })
      },
      onError(error) {
        toastError({
          ...TOAST_MSG.financialProjection.saasRevenue.submitFail,
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

interface SubmitSaasRevenueFormRequest extends SaasRevenue {}

const useSubmit = () => {
  return useMutation<
    AxiosResponse<SaasRevenue>,
    AxiosError<ErrorResponse>,
    SubmitSaasRevenueFormRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.financialProjection.saasRevenue.submit,
        data
      })
    }
  })
}

interface UpdateSaasRevenueFormRequest extends SaasRevenue {}

const useUpdate = () => {
  return useMutation<
    AxiosResponse<SaasRevenue>,
    AxiosError<ErrorResponse>,
    UpdateSaasRevenueFormRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.financialProjection.saasRevenue.update,
        data
      })
    }
  })
}
