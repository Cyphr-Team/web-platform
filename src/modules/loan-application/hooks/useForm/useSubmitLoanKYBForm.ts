import { API_PATH } from "@/constants"
import { postRequest, putRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"
import { IBusinessFormValue } from "../../constants/form"
import { KYBInformationResponse, KYBInformation } from "../../constants/type"
import { formatKybForm } from "../../services/form.services"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { useCallback } from "react"

type Props = {
  rawData: IBusinessFormValue
  onSuccess: (data: KYBInformationResponse) => void
}

export const useSubmitLoanKYBForm = ({ rawData, onSuccess }: Props) => {
  const { mutateAsync: updateLoanKyb, isPending: isUpdatingLoanKyb } =
    useUpdate()

  const { mutateAsync: submitLoanKyb, isPending: isSubmittingLoanKyb } =
    useSubmit()

  const onSubmitSuccess = useCallback(
    (data: KYBInformationResponse) => onSuccess(data),
    [onSuccess]
  )

  // Call API
  const submitLoanKYBForm = async (loanApplicationId: string) => {
    const formattedData = rawData && formatKybForm(rawData)

    if (rawData.id.length) {
      // Update KYB
      await updateLoanKyb({ ...formattedData })
    } else {
      // Create KYB
      await submitLoanKyb(
        {
          loanApplicationId,
          ...formattedData
        },
        {
          onSuccess: (res) => onSubmitSuccess(res.data)
        }
      )
    }
  }
  return {
    isLoading: isUpdatingLoanKyb || isSubmittingLoanKyb,
    submitLoanKYBForm
  }
}

const useSubmit = () => {
  return useMutation<
    AxiosResponse<KYBInformationResponse>,
    AxiosError<ErrorResponse>,
    KYBInformation
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.kybForm,
        data
      })
    }
  })
}

const useUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<KYBInformationResponse>,
    AxiosError<ErrorResponse>,
    KYBInformation
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.kybForm,
        data
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_KYB_FORM]
      })
    }
  })
}
