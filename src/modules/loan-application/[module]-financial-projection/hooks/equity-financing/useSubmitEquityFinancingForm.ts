import { API_PATH } from "@/constants"
import {
  FpEquityFinancingField,
  type FpEquityFinancingFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-equity-store"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { useCreateMutation } from "@/modules/loan-application/[module]-financial-projection/hooks"
import { type SubmissionHook } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  type FpEquityFinancingFormMutateRequest,
  type FpEquityFinancingFormResponse
} from "@/modules/loan-application/[module]-financial-projection/types/equity-form"
import {
  parseISOStringToMMYYYY,
  parseMMYYYYToISOString
} from "@/utils/date.utils"
import { useQueryClient } from "@tanstack/react-query"
import { type AxiosResponse } from "axios"

interface Props {
  rawData: FpEquityFinancingFormValue
}

export const useSubmitEquityFinancingForm = <
  T extends FpEquityFinancingFormMutateRequest,
  P extends FpEquityFinancingFormResponse
>({
  rawData
}: Props): SubmissionHook<P> => {
  const queryClient = useQueryClient()

  const updateMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.equityFinancing.update
  )

  const submitMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.equityFinancing.submit
  )

  const submitEquityFinancingForm = async (
    loanApplicationId: string
  ): Promise<AxiosResponse<P>> => {
    const mutationToUse = rawData?.applicationId?.length
      ? updateMutation
      : submitMutation

    const formattedData = {
      financialProjectionSetupId: loanApplicationId,
      forms: rawData?.equityFinancing?.map((formValue) => ({
        ...formValue,
        receivedDate: parseMMYYYYToISOString(formValue.receivedDate)
      }))
    } as T

    const result = await mutationToUse.mutateAsync(formattedData)

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_EQUITY_FINANCING_FORM]
    })

    return result
  }

  return {
    isLoading: updateMutation.isPending || submitMutation.isPending,
    submitForm: submitEquityFinancingForm
  }
}

export const reverseFormatEquityFinancingForm = (
  responseData: FpEquityFinancingFormResponse
): FpEquityFinancingFormValue => {
  return {
    [FpEquityFinancingField.applicationId]:
      responseData.financialProjectionSetupId,
    [FpEquityFinancingField.equityFinancing]: responseData.forms.map(
      (formValue) => ({
        ...formValue,
        receivedDate: parseISOStringToMMYYYY(formValue.receivedDate)
      })
    )
  }
}
