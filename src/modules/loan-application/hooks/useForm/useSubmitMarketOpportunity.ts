import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MarketOpportunityFormValue } from "../../constants/form"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "@/types/common.type"
import { postRequest, putRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { customRequestHeader } from "@/utils/request-header"
import { QUERY_KEY } from "../../constants/query-key"
import { MarketOpportunityFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/market-opportunity/type.ts"
import { useCallback } from "react"

type Props = {
  rawData: MarketOpportunityFormValue
  onSuccess: (data: MarketOpportunityFormResponse) => void
}

export const useSubmitMarketOpportunity = ({ rawData, onSuccess }: Props) => {
  const { mutateAsync: update, isPending: isUpdating } = useUpdate()

  const { mutateAsync: submit, isPending: isSubmitting } = useSubmit()

  const onSubmitSuccess = useCallback(
    (data: MarketOpportunityFormResponse) => onSuccess(data),
    [onSuccess]
  )

  const submitLoanMarketOpportunity = async (loanRequestId: string) => {
    if (rawData?.id?.length) {
      await update({ ...rawData, loanApplicationId: loanRequestId })
    } else {
      await submit(
        {
          ...rawData,
          loanApplicationId: loanRequestId
        },
        {
          onSuccess: (res) => onSubmitSuccess(res.data)
        }
      )
    }
  }
  return {
    isLoading: isUpdating || isSubmitting,
    submitLoanMarketOpportunity
  }
}

const useSubmit = () => {
  return useMutation<
    AxiosResponse<MarketOpportunityFormResponse>,
    AxiosError<ErrorResponse>,
    MarketOpportunityFormValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.marketOpportunity.index,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}

const useUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<MarketOpportunityFormResponse>,
    AxiosError<ErrorResponse>,
    MarketOpportunityFormValue
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.marketOpportunity.index,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_MARKET_OPPORTUNITY]
      })
    }
  })
}
