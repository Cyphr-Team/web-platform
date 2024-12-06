import { API_PATH } from "@/constants"
import { putRequest, postRequest } from "@/services/client.service.ts"
import { customRequestHeader } from "@/utils/request-header.ts"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { type AxiosResponse, type AxiosError } from "axios"
import { type OperatingExpensesFormValue } from "../../constants/form.ts"
import {
  type OperatingExpensesInformationResponse,
  type OperatingExpensesInformation
} from "../../constants/type.ts"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { type ErrorResponse } from "@/types/common.type.ts"
import { useCallback } from "react"

interface Props {
  rawData: OperatingExpensesFormValue
  onSuccess: (data: OperatingExpensesInformationResponse) => void
}

export const useSubmitOperatingExpensesForm = ({
  rawData,
  onSuccess
}: Props) => {
  // Call API
  const { mutateAsync: updateOperatingExpenses, isPending: isUpdating } =
    useUpdate()

  const { mutateAsync: submitOperatingExpenses, isPending: isSubmitting } =
    useSubmit()

  const onSubmitSuccess = useCallback(
    (data: OperatingExpensesInformationResponse) => onSuccess(data),
    [onSuccess]
  )
  // Call API
  const submitOperatingExpensesForm = async (loanApplicationId: string) => {
    if (rawData?.id?.length) {
      // Update
      return await updateOperatingExpenses({ ...rawData })
    } else {
      // Create
      return await submitOperatingExpenses(
        {
          ...rawData,
          loanApplicationId
        },
        {
          onSuccess: (res) => onSubmitSuccess(res.data)
        }
      )
    }
  }

  return {
    isLoading: isUpdating || isSubmitting,
    submitOperatingExpensesForm
  }
}

const useUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<OperatingExpensesInformationResponse>,
    AxiosError<ErrorResponse>,
    OperatingExpensesInformation
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.operatingExpensesForm,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_OPERATING_EXPENSES_FORM]
      })
    }
  })
}

const useSubmit = () => {
  return useMutation<
    AxiosResponse<OperatingExpensesInformationResponse>,
    AxiosError<ErrorResponse>,
    OperatingExpensesInformation
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.operatingExpensesForm,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
