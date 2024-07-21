import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BusinessModelFormValue } from "../../constants/form"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "@/types/common.type"
import { postRequest, putRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { customRequestHeader } from "@/utils/request-header"
import { QUERY_KEY } from "../../constants/query-key"
import { BusinessModelFormResponse } from "../../components/organisms/loan-application-form/business-model/type"

export const useSubmitLoanBusinessModelForm = (
  rawData: BusinessModelFormValue
) => {
  const { mutateAsync: update, isPending: isUpdating } = useUpdate()

  const { mutateAsync: submit, isPending: isSubmitting } = useSubmit()

  const submitLoanBusinessModelForm = async () => {
    if (rawData?.id?.length) {
      await update({ ...rawData })
    } else {
      await submit({
        ...rawData
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
        data,
        customHeader: customRequestHeader.customHeaders
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
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_BUSINESS_MODEL_FORM]
      })
    }
  })
}
