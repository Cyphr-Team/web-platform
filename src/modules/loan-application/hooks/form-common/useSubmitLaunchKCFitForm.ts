import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type LaunchKCFitFormValue } from "../../constants/form.ts"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "@/types/common.type.ts"
import { postRequest, putRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { useCallback } from "react"
import { type LaunchKcFitFormResponse } from "../../components/organisms/loan-application-form/custom-form/launchkc/launchkc-fit/type.ts"
interface Props {
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
