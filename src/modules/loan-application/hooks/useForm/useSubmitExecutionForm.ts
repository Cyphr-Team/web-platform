import { AxiosError, AxiosResponse } from "axios"
import { ExecutionFormResponse } from "../../components/organisms/loan-application-form/execution/type"
import { ExecutionFormValue } from "../../constants/form"
import { ErrorResponse } from "@/types/common.type"
import { postRequest, putRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/query-key"

export const useSubmitExecutionForm = (rawData: ExecutionFormValue) => {
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateLoanExecutionForm()

  const { mutateAsync: submit, isPending: isSubmitting } =
    useSubmitLoanExecutionForm()
  // Call API
  const submitLoanExecutionForm = async () => {
    if (rawData.id?.length) {
      // Update Execution Form
      await update({ ...rawData })
    } else {
      // Create Execution Form
      await submit({
        ...rawData
      })
    }
  }
  return {
    isLoading: isSubmitting || isUpdating,
    submitLoanExecutionForm
  }
}

const useSubmitLoanExecutionForm = () => {
  return useMutation<
    AxiosResponse<ExecutionFormResponse>,
    AxiosError<ErrorResponse>,
    ExecutionFormValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.executionForm.index,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}

const useUpdateLoanExecutionForm = () => {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<ExecutionFormResponse>,
    AxiosError<ErrorResponse>,
    ExecutionFormValue
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.executionForm.index,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_EXECUTION_FORM]
      })
    }
  })
}
