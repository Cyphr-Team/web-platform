import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type BusinessModelFormValue } from "../../constants/form"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "@/types/common.type"
import { postRequest, putRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key"
import { type BusinessModelFormResponse } from "../../components/organisms/loan-application-form/business-model/type"
import { useCallback } from "react"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"

interface Props {
  rawData: BusinessModelFormValue
  onSuccess: (data: BusinessModelFormResponse) => void
}

export const useSubmitLoanBusinessModelForm = ({
  rawData,
  onSuccess
}: Props) => {
  const { mutateAsync: update, isPending: isUpdating } = useUpdate()

  const { mutateAsync: submit, isPending: isSubmitting } = useSubmit()

  const onSubmitSuccess = useCallback(
    (data: BusinessModelFormResponse) => onSuccess(data),
    [onSuccess]
  )

  const submitLoanBusinessModelForm = async () => {
    const data = {
      ...rawData,
      // additional format for sure
      annualPayroll: USDFormatter(rawData?.annualPayroll).value
    }

    if (data?.id?.length) {
      await update(data)
    } else {
      await submit(data, {
        onSuccess: (res) => onSubmitSuccess(res.data)
      })
    }
  }

  return {
    isLoading: isUpdating || isSubmitting,
    submitLoanBusinessModelForm
  }
}

const useSubmit = () => {
  return useMutation<
    AxiosResponse<BusinessModelFormResponse>,
    AxiosError<ErrorResponse>,
    BusinessModelFormValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.businessModelForm.index,
        data
      })
    }
  })
}

const useUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<BusinessModelFormResponse>,
    AxiosError<ErrorResponse>,
    BusinessModelFormValue
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.businessModelForm.index,
        data
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_BUSINESS_MODEL_FORM]
      })
    }
  })
}
