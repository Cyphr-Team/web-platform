import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LaunchKCFitFormValue } from "../../constants/form"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "@/types/common.type"
import { postRequest, putRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { customRequestHeader } from "@/utils/request-header"
import { LaunchKcFitFormResponse } from "../../components/organisms/loan-application-form/launchkc-fit/type"
import { QUERY_KEY } from "../../constants/query-key"

export const useSubmitLoanLaunchKCFitForm = (rawData: LaunchKCFitFormValue) => {
  const { mutateAsync: update, isPending: isUpdating } = useUpdate()

  const { mutateAsync: submit, isPending: isSubmitting } = useSubmit()

  const submitLoanLaunchKCFitForm = async () => {
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
        data,
        customHeader: customRequestHeader.customHeaders
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
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_LAUNCH_KC_FIT_FORM]
      })
    }
  })
}
