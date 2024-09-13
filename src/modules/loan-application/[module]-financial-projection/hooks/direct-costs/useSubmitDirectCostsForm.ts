import { API_PATH } from "@/constants"
import {
  DirectCostsField,
  DirectCostsFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { useCreateMutation } from "@/modules/loan-application/[module]-financial-projection/hooks"
import { SubmissionHook } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  DirectCostsFormMutateRequest,
  DirectCostsFormResponse
} from "@/modules/loan-application/[module]-financial-projection/types/direct-costs-form"
import {
  parseISOStringToMMYYYY,
  parseMMYYYYToISOString
} from "@/utils/date.utils"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type Props = {
  rawData: DirectCostsFormValue
}

export const useSubmitDirectCostsForm = <
  T extends DirectCostsFormMutateRequest,
  P extends DirectCostsFormResponse
>({
  rawData
}: Props): SubmissionHook<P> => {
  const queryClient = useQueryClient()

  const updateMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.directCosts.update
  )

  const submitMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.directCosts.submit
  )

  const submitDirectCostsForm = async (
    loanApplicationId: string
  ): Promise<AxiosResponse<P>> => {
    const mutationToUse = rawData?.applicationId?.length
      ? updateMutation
      : submitMutation

    const formattedData = {
      financialProjectionSetupId: loanApplicationId,
      forms: rawData?.directCosts?.map((formValue) => ({
        ...formValue,
        startDate: parseMMYYYYToISOString(formValue.startDate)
      }))
    } as T

    const result = await mutationToUse.mutateAsync(formattedData)

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_DIRECT_COSTS_FORM]
    })

    return result
  }

  return {
    isLoading: updateMutation.isPending || submitMutation.isPending,
    submitForm: submitDirectCostsForm
  }
}

export const reverseFormatDirectCostsForm = (
  responseData: DirectCostsFormResponse
): DirectCostsFormValue => {
  return {
    [DirectCostsField.applicationId]: responseData.financialProjectionSetupId,
    [DirectCostsField.directCosts]: responseData.forms.map((formValue) => ({
      ...formValue,
      startDate: parseISOStringToMMYYYY(formValue.startDate)
    }))
  }
}
