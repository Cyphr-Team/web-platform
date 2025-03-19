import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type MarketOpportunityFormValue } from "../../constants/form.ts"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "@/types/common.type.ts"
import { postRequest, putRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { customRequestHeader } from "@/utils/request-header.ts"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { type MarketOpportunityFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/market-opportunity/type.ts"
import { useCallback } from "react"

interface Props {
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
