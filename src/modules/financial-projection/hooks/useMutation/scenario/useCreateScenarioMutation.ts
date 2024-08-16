import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import * as z from "zod"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { FinancialScenario } from "@/modules/financial-projection/types"
import { QUERY_KEY } from "@/modules/financial-projection/constants/query-key"

export const createScenarioForm = z.object({
  financialProjectionId: z
    .string()
    .min(1, "FinancialProjectionId is required."),
  name: z.string().min(1, "Name is required.")
})

export type CreateFinancialScenarioValue = z.infer<typeof createScenarioForm>

export const useCreateScenarioMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<FinancialScenario>,
    AxiosError<ErrorResponse>,
    CreateFinancialScenarioValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.financialProjection.company.scenario.create,
        data
      })
    },
    onSuccess() {
      toastSuccess(TOAST_MSG.financialProjection.scenarios.createSuccess)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_FINANCIAL_PROJECTION_SCENARIOS]
      })
    },
    onError(error) {
      toastError({
        ...TOAST_MSG.financialProjection.scenarios.createFailed,
        description: getAxiosError(error).message
      })
    }
  })
}
