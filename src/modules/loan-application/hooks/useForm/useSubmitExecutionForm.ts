import { API_PATH } from "@/constants"
import { postRequest, putRequest } from "@/services/client.service"
import { ErrorResponse } from "@/types/common.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useCallback } from "react"
import { transformExecutionFormToRequest } from "../../components/organisms/loan-application-form/execution/constants"
import {
  ExecutionFormRequest,
  ExecutionFormResponse
} from "../../components/organisms/loan-application-form/execution/type"
import { ExecutionFormValue } from "../../constants/form"
import { QUERY_KEY } from "../../constants/query-key"

type Props = {
  rawData: ExecutionFormValue
  onSuccess: (data: ExecutionFormResponse) => void
}

export const useSubmitExecutionForm = ({ rawData, onSuccess }: Props) => {
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateLoanExecutionForm()

  const { mutateAsync: submit, isPending: isSubmitting } =
    useSubmitLoanExecutionForm()

  const onSubmitSuccess = useCallback(
    (data: ExecutionFormResponse) => onSuccess(data),
    [onSuccess]
  )

  const submitLoanExecutionForm = async () => {
    if (rawData.id?.length) {
      // Update Execution Form
      await update(transformExecutionFormToRequest(rawData))
    } else {
      // Create Execution Form
      await submit(transformExecutionFormToRequest(rawData), {
        onSuccess: (res) => onSubmitSuccess(res.data)
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
    ExecutionFormRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.executionForm.index,
        data
      })
    }
  })
}

const useUpdateLoanExecutionForm = () => {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<ExecutionFormResponse>,
    AxiosError<ErrorResponse>,
    ExecutionFormRequest
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.executionForm.index,
        data
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_EXECUTION_FORM]
      })
    }
  })
}
