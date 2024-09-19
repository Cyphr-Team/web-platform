import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { useCreateMutation } from "@/modules/loan-application/[module]-financial-projection/hooks"
import { SubmissionHook } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import {
  RevenueStream,
  SubmitRevenueStreamRequest,
  SubmitRevenueStreamResponse
} from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { formatToISOString } from "@/utils/date.utils.ts"

type Props = {
  rawData: RevenueStream
}

export const useSubmitRevenueForm = <
  T extends SubmitRevenueStreamRequest,
  P extends SubmitRevenueStreamResponse
>(
  props: Props
): SubmissionHook<P> => {
  const { rawData } = props
  const queryClient = useQueryClient()

  const updateMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.revenueStream.update
  )

  const submitMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.revenueStream.submit
  )

  const submitForm = async (
    loanApplicationId: string
  ): Promise<AxiosResponse<P>> => {
    const mutationToUse = rawData?.id?.length ? updateMutation : submitMutation

    const formattedData = {
      ...rawData,
      financialProjectionSetupId: loanApplicationId,
      unitSales: formatData(rawData.unitSales),
      recurringCharges: formatData(rawData.recurringCharges),
      billableHours: formatData(rawData.billableHours),
      contracts: formatData(rawData.contracts, true)
    } as T

    return await mutationToUse.mutateAsync(formattedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GET_REVENUE]
        })
      }
    })
  }

  return {
    isLoading: updateMutation.isPending || submitMutation.isPending,
    submitForm
  }
}

const formatData = <T extends { startDate: string; endDate?: string }>(
  data: T[],
  hasEndDate: boolean = false
) =>
  data.map((item) => ({
    ...item,
    startDate: formatToISOString(item.startDate),
    ...(hasEndDate && { endDate: formatToISOString(item.endDate!) })
  }))
