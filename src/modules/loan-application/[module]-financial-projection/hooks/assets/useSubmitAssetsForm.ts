import { API_PATH } from "@/constants"
import {
  AssetsField,
  type AssetsFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { useCreateMutation } from "@/modules/loan-application/[module]-financial-projection/hooks"
import { type SubmissionHook } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  type AssetsCurrentFormMutateRequest,
  type AssetsCurrentFormResponse,
  type AssetsLongTermFormMutateRequest,
  type AssetsLongTermFormResponse
} from "@/modules/loan-application/[module]-financial-projection/types/assets-form"
import {
  parseISOStringToMMYYYY,
  parseMMYYYYToISOString
} from "@/utils/date.utils"
import { useQueryClient } from "@tanstack/react-query"
import { type AxiosResponse } from "axios"

interface Props {
  rawData: AssetsFormValue
}

export const useSubmitCurrentAssetsForm = <
  T extends AssetsCurrentFormMutateRequest,
  P extends AssetsCurrentFormResponse
>({
  rawData
}: Props): SubmissionHook<P> => {
  const queryClient = useQueryClient()

  const updateMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.assetsCurrent.update
  )

  const submitMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.assetsCurrent.submit
  )

  const submitAssetsForm = async (
    loanApplicationId: string
  ): Promise<AxiosResponse<P>> => {
    const mutationToUse = rawData?.applicationId?.length
      ? updateMutation
      : submitMutation

    const formattedData = {
      financialProjectionSetupId: loanApplicationId,
      receivableDays: rawData?.receivableDays
    } as T

    const result = await mutationToUse.mutateAsync(formattedData)

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_CURRENT_ASSETS_FORM]
    })

    return result
  }

  return {
    isLoading: updateMutation.isPending || submitMutation.isPending,
    submitForm: submitAssetsForm
  }
}

export const useSubmitLongTermAssetsForm = <
  T extends AssetsLongTermFormMutateRequest,
  P extends AssetsLongTermFormResponse
>({
  rawData
}: Props): SubmissionHook<P> => {
  const queryClient = useQueryClient()

  const updateMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.assetsLongTerm.update
  )

  const submitMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.assetsLongTerm.submit
  )

  const submitAssetsForm = async (
    loanApplicationId: string
  ): Promise<AxiosResponse<P>> => {
    const mutationToUse = rawData?.applicationId?.length
      ? updateMutation
      : submitMutation

    const formattedData = {
      financialProjectionSetupId: loanApplicationId,
      forms: rawData?.longTermAssets?.map((formValue) => ({
        ...formValue,
        purchaseDate: parseMMYYYYToISOString(formValue.purchaseDate)
      }))
    } as T

    const result = await mutationToUse.mutateAsync(formattedData)

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_LONG_TERM_ASSETS_FORM]
    })

    return result
  }

  return {
    isLoading: updateMutation.isPending || submitMutation.isPending,
    submitForm: submitAssetsForm
  }
}

export const reverseFormatAssetsForm = (
  responseCurrentData: AssetsCurrentFormResponse,
  responseLongTermData: AssetsLongTermFormResponse
): AssetsFormValue => {
  return {
    [AssetsField.APPLICATION_ID]:
      responseCurrentData.financialProjectionSetupId ?? "",
    [AssetsField.RECEIVABLE_DAYS]:
      responseCurrentData.receivableDays.toString(),
    [AssetsField.LONG_TERM_ASSETS]:
      responseLongTermData.forms?.map((formValue) => ({
        ...formValue,
        usefulLife: formValue.usefulLife.toString(),
        purchaseDate: parseISOStringToMMYYYY(formValue.purchaseDate)
      })) ?? []
  }
}
