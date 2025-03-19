import { API_PATH } from "@/constants"
import { putRequest, postRequest } from "@/services/client.service.ts"
import { customRequestHeader } from "@/utils/request-header.ts"
import { useMutation } from "@tanstack/react-query"
import { type AxiosResponse, type AxiosError } from "axios"
import { type ErrorResponse } from "react-router-dom"
import { type FinancialFormValue } from "../../constants/form.ts"
import {
  type FinancialInformationResponse,
  type FinancialInformation
} from "../../constants/type.ts"
import { useCallback } from "react"

interface Props {
  rawData: FinancialFormValue
  onSuccess: (data: FinancialInformationResponse) => void
}

export const useSubmitLoanFinancialForm = ({ rawData, onSuccess }: Props) => {
  const { mutateAsync: updateLoanFinancial, isPending: isUpdating } =
    useUpdateLoanFinancialInformation()

  const { mutateAsync: submitLoanFinancial, isPending: isSubmitting } =
    useSubmitLoanFinancialInformation()

  const onSubmitSuccess = useCallback(
    (data: FinancialInformationResponse) => onSuccess(data),
    [onSuccess]
  )
  const submitLoanFinancialForm = async (loanApplicationId: string) => {
    if (rawData?.id?.length) {
      // Update
      return await updateLoanFinancial({ ...rawData })
    } else {
      // Create
      return await submitLoanFinancial(
        {
          ...rawData,
          loanApplicationId,
          incomeCategories: rawData.incomeCategories ?? []
        },
        {
          onSuccess: (res) => onSubmitSuccess(res.data)
        }
      )
    }
  }

  return {
    isLoading: isUpdating || isSubmitting,
    submitLoanFinancialForm
  }
}
const useUpdateLoanFinancialInformation = () => {
  return useMutation<
    AxiosResponse<FinancialInformationResponse>,
    AxiosError<ErrorResponse>,
    FinancialInformation
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.financialForm,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}

const useSubmitLoanFinancialInformation = () => {
  return useMutation<
    AxiosResponse<FinancialInformationResponse>,
    AxiosError<ErrorResponse>,
    FinancialInformation
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.financialForm,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
