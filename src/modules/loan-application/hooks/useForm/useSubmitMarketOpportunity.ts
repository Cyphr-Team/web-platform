import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MarketOpportunityFormValue } from "../../constants/form"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "@/types/common.type"
import { postRequest, putRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { customRequestHeader } from "@/utils/request-header"
import { QUERY_KEY } from "../../constants/query-key"
import { MarketOpportunityFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/market-opportunity/type.ts"

export const useSubmitMarketOpportunity = (
  rawData: MarketOpportunityFormValue
) => {
  const { mutateAsync: update, isPending: isUpdating } = useUpdate()

  const { mutateAsync: submit, isPending: isSubmitting } = useSubmit()

  const submitLoanMarketOpportunity = async (loanRequestId: string) => {
    if (rawData?.id?.length) {
      await update({ ...rawData, loanApplicationId: loanRequestId })
    } else {
      await submit({
        ...rawData,
        loanApplicationId: loanRequestId
      })
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

/// TODO: implement PUT request in BE
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
