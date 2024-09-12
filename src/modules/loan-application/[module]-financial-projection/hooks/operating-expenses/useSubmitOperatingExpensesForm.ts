import { API_PATH } from "@/constants"
import {
  FpOperatingExpensesField,
  FpOperatingExpensesFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { useCreateMutation } from "@/modules/loan-application/[module]-financial-projection/hooks"
import { SubmissionHook } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  FpOperatingExpensesFormMutateRequest,
  FpOperatingExpensesFormResponse
} from "@/modules/loan-application/[module]-financial-projection/types/operating-expenses-form"
import {
  parseISOStringToMMYYYY,
  parseMMYYYYToISOString
} from "@/utils/date.utils"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type Props = {
  rawData: FpOperatingExpensesFormValue
}

export const useSubmitFpOperatingExpensesForm = <
  T extends FpOperatingExpensesFormMutateRequest,
  P extends FpOperatingExpensesFormResponse
>({
  rawData
}: Props): SubmissionHook<P> => {
  const queryClient = useQueryClient()

  const updateMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.operatingExpenses.update
  )

  const submitMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.operatingExpenses.submit
  )

  const submitFpOperatingExpensesForm = async (
    loanApplicationId: string
  ): Promise<AxiosResponse<P>> => {
    const mutationToUse = rawData?.applicationId?.length
      ? updateMutation
      : submitMutation

    const formattedData = {
      financialProjectionSetupId: loanApplicationId,
      forms: rawData?.operatingExpenses?.map((formValue) => ({
        ...formValue,
        startDate: parseMMYYYYToISOString(formValue.startDate)
      }))
    } as T

    const result = await mutationToUse.mutateAsync(formattedData)

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_OPERATING_EXPENSES_FORM]
    })

    return result
  }

  return {
    isLoading: updateMutation.isPending || submitMutation.isPending,
    submitForm: submitFpOperatingExpensesForm
  }
}

export const reverseFormatFpOperatingExpensesForm = (
  responseData: FpOperatingExpensesFormResponse
): FpOperatingExpensesFormValue => {
  return {
    [FpOperatingExpensesField.applicationId]:
      responseData.financialProjectionSetupId,
    [FpOperatingExpensesField.operatingExpenses]: responseData.forms.map(
      (formValue) => ({
        ...formValue,
        startDate: parseISOStringToMMYYYY(formValue.startDate)
      })
    )
  }
}
