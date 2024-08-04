import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BusinessModelFormValue } from "../../constants/form"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "@/types/common.type"
import { postRequest, putRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key"
import { BusinessModelFormResponse } from "../../components/organisms/loan-application-form/business-model/type"
import { useCallback } from "react"

type Props = {
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
    if (rawData?.id?.length) {
      await update({ ...rawData })
    } else {
      await submit(
        {
          ...rawData
        },
        {
          onSuccess: (res) => onSubmitSuccess(res.data)
        }
      )
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
