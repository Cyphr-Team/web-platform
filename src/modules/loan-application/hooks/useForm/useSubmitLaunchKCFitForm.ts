import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LaunchKCFitFormValue } from "../../constants/form"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "@/types/common.type"
import { postRequest, putRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { LaunchKcFitFormResponse } from "../../components/organisms/loan-application-form/launchkc-fit/type"
import { QUERY_KEY } from "../../constants/query-key"
import { useCallback } from "react"
type Props = {
  rawData: LaunchKCFitFormValue
  onSuccess: (data: LaunchKcFitFormResponse) => void
}

export const useSubmitLoanLaunchKCFitForm = ({ rawData, onSuccess }: Props) => {
  const { mutateAsync: update, isPending: isUpdating } = useUpdate()
  const { mutateAsync: submit, isPending: isSubmitting } = useSubmit()

  const onSubmitSuccess = useCallback(
    (data: LaunchKcFitFormResponse) => onSuccess(data),
    [onSuccess]
  )
  const submitLoanLaunchKCFitForm = async () => {
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
    submitLoanLaunchKCFitForm
  }
}

const useSubmit = () => {
  return useMutation<
    AxiosResponse<LaunchKcFitFormResponse>,
    AxiosError<ErrorResponse>,
    LaunchKCFitFormValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.launchKCFitForm.index,
        data
      })
    }
  })
}

const useUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<LaunchKcFitFormResponse>,
    AxiosError<ErrorResponse>,
    LaunchKCFitFormValue
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.launchKCFitForm.index,
        data
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_LAUNCH_KC_FIT_FORM]
      })
    }
  })
}
