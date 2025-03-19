import { API_PATH } from "@/constants"
import { postRequest, putRequest } from "@/services/client.service.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosResponse, type AxiosError } from "axios"
import { type IBusinessFormValue } from "../../constants/form.ts"
import {
  type KYBInformationResponse,
  type KYBInformation
} from "../../constants/type.ts"
import { formatKybForm } from "../../services/form.services.ts"
import { type ErrorResponse } from "@/types/common.type.ts"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { useCallback } from "react"

interface Props {
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
