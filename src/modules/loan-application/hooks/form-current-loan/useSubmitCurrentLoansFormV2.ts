import { type CurrentLoansFormValue } from "../../constants/form.ts"
import { API_PATH } from "@/constants"
import { type CurrentLoanFormsV2Value } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormV2.tsx"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postRequest, putRequest } from "@/services/client.service.ts"
import type { AxiosError, AxiosResponse } from "axios"
import type { ErrorResponse } from "@/types/common.type.ts"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"

interface Options {
  rawData: CurrentLoanFormsV2Value
}

export const useSubmitCurrentLoansFormV2 = (options: Options) => {
  const { rawData } = options
  const queryClient = useQueryClient()

  const { mutateAsync: submit, isPending: isUpdating } = useSubmit()

  const { mutateAsync: update, isPending: isSubmitting } = useUpdate()

  const onSuccess = () =>
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_CURRENT_LOANS_FORM_V2]
    })

  const submitCurrentLoansForm = async (applicationId: string) => {
    if (rawData.id) {
      return await update(
        {
          id: rawData.id,
          currentLoans: rawData.currentLoans
        },
        {
          onSuccess
        }
      )
    }

    return await submit(
      {
        currentLoans: rawData.currentLoans,
        loanApplicationId: applicationId
      },
      {
        onSuccess
      }
    )
  }

  return {
    isLoading: isUpdating || isSubmitting,
    submitCurrentLoansForm
  }
}

interface SubmitCurrentLoanV2Request {
  loanApplicationId: string
  currentLoans: CurrentLoansFormValue["currentLoans"]
}

interface SubmitCurrentLoanV2Response {
  currentLoans: CurrentLoansFormValue["currentLoans"]
}

const useSubmit = () => {
  return useMutation<
    AxiosResponse<SubmitCurrentLoanV2Response>,
    AxiosError<ErrorResponse>,
    SubmitCurrentLoanV2Request
  >({
    mutationFn: (data) =>
      postRequest({
        path: API_PATH.application.formV2.currentLoans.index,
        data
      })
  })
}

interface UpdateCurrentLoanV2Request {
  id: string // form id
  currentLoans: CurrentLoansFormValue["currentLoans"]
}

interface UpdateCurrentLoanV2Response {
  currentLoans: CurrentLoansFormValue["currentLoans"]
}

const useUpdate = () => {
  return useMutation<
    AxiosResponse<UpdateCurrentLoanV2Response>,
    AxiosError<ErrorResponse>,
    UpdateCurrentLoanV2Request
  >({
    mutationFn: (data) =>
      putRequest({
        path: API_PATH.application.formV2.currentLoans.index,
        data
      })
  })
}
