import { API_PATH } from "@/constants"
import {
  ExpenseTaxRateField,
  type ExpenseTaxRateFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-expense-tax-rate-store"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { useCreateMutation } from "@/modules/loan-application/[module]-financial-projection/hooks"
import { type SubmissionHook } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  type ExpenseTaxRateFormMutateRequest,
  type ExpenseTaxRateFormResponse
} from "@/modules/loan-application/[module]-financial-projection/types/tax-rate-form"
import { useQueryClient } from "@tanstack/react-query"
import { type AxiosResponse } from "axios"

interface Props {
  rawData: ExpenseTaxRateFormValue
}

export const useSubmitTaxRateForm = <
  T extends ExpenseTaxRateFormMutateRequest,
  P extends ExpenseTaxRateFormResponse
>({
  rawData
}: Props): SubmissionHook<P> => {
  const queryClient = useQueryClient()

  const updateMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.taxRates.update
  )

  const submitMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.taxRates.submit
  )

  const submitExpenseTaxRateForm = async (
    loanApplicationId: string
  ): Promise<AxiosResponse<P>> => {
    const mutationToUse = rawData?.applicationId?.length
      ? updateMutation
      : submitMutation

    const formattedData = {
      financialProjectionSetupId: loanApplicationId,
      incomeTaxRate: rawData?.incomeTaxRate
    } as T

    const result = await mutationToUse.mutateAsync(formattedData)

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_EXPENSE_TAX_RATE_FORM]
    })

    return result
  }

  return {
    isLoading: updateMutation.isPending || submitMutation.isPending,
    submitForm: submitExpenseTaxRateForm
  }
}

export const reverseFormatExpenseTaxRateForm = (
  responseData: ExpenseTaxRateFormResponse
): ExpenseTaxRateFormValue => {
  return {
    [ExpenseTaxRateField.applicationId]:
      responseData.financialProjectionSetupId,
    [ExpenseTaxRateField.incomeTaxRate]: responseData.incomeTaxRate
  }
}
