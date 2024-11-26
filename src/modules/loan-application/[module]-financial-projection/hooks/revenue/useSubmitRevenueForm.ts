import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { useCreateMutation } from "@/modules/loan-application/[module]-financial-projection/hooks"
import { type SubmissionHook } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { useQueryClient } from "@tanstack/react-query"
import { type AxiosResponse } from "axios"
import {
  type BillableHour,
  type Contract,
  type RecurringCharge,
  type RevenueStream,
  RevenueType,
  type SubmitRevenueStreamRequest,
  type SubmitRevenueStreamResponse,
  type UnitSale
} from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { formatToISOString } from "@/utils/date.utils.ts"

interface Props {
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
      unitSales: formatData({
        data: rawData.unitSales,
        type: RevenueType.UnitSales
      }),
      recurringCharges: formatData({
        data: rawData.recurringCharges,
        type: RevenueType.RecurringCharges
      }),
      billableHours: formatData({
        data: rawData.billableHours,
        type: RevenueType.BillableHours
      }),
      contracts: formatData({
        data: rawData.contracts,
        type: RevenueType.Contracts
      })
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

interface formatOption {
  data: UnitSale[] | BillableHour[] | RecurringCharge[] | Contract[]
  type?: RevenueType
}

const formatData = (options: formatOption) => {
  const { data, type } = options

  return data.map((untypedItem) => {
    const formattedItem = {
      ...untypedItem,
      startDate: formatToISOString(untypedItem.startDate)
    }

    if (type == RevenueType.Contracts) {
      const typedItem = untypedItem as Contract

      Object.assign(formattedItem, {
        endDate: formatToISOString(typedItem.endDate)
      })
    }

    if (type === RevenueType.RecurringCharges) {
      const typedItem = untypedItem as RecurringCharge

      Object.assign(formattedItem, {
        upfrontFee: typedItem.hasUpfrontFee ? typedItem.upfrontFee : undefined,
        hasUpfrontFee: undefined
      })
    }

    return formattedItem
  })
}
