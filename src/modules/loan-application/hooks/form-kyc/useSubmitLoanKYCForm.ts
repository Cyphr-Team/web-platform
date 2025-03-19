import { API_PATH } from "@/constants"
import { postRequest, putRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import {
  type KYCInformation,
  type KYCInformationResponse
} from "../../constants/type"
import { formatKycForm } from "../../services/form.services"
import { type IOwnerFormValue } from "@/modules/loan-application/constants/form.ts"
import { type ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { useCallback } from "react"

interface Props {
  rawData: IOwnerFormValue
  onSuccess: (data: KYCInformationResponse) => void
}

export const useSubmitLoanKYCForm = ({ rawData, onSuccess }: Props) => {
  const { mutateAsync: updateLoanKyc, isPending: isUpdating } =
    useUpdateLoanKycInformation()

  const { mutateAsync: submitLoanKyc, isPending: isSubmitting } =
    useSubmitLoanKycInformation()

  const onSubmitSuccess = useCallback(
    (data: KYCInformationResponse) => onSuccess(data),
    [onSuccess]
  )

  const submitLoanKYCForm = async (loanApplicationId: string) => {
    const formattedData = rawData && formatKycForm(rawData)

    if (rawData?.id?.length) {
      // Update KYC
      return await updateLoanKyc({ ...formattedData })
    } else {
      // Create KYC
      return await submitLoanKyc(
        { loanApplicationId, ...formattedData },
        {
          onSuccess: (res) => onSubmitSuccess(res.data)
        }
      )
    }
  }

  return {
    isLoading: isUpdating || isSubmitting,
    submitLoanKYCForm
  }
}

const useUpdateLoanKycInformation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<KYCInformationResponse>,
    AxiosError<ErrorResponse>,
    KYCInformation
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.kycForm,
        data
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_KYC_FORM]
      })
    }
  })
}

const useSubmitLoanKycInformation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<KYCInformationResponse>,
    AxiosError<ErrorResponse>,
    KYCInformation
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.kycForm,
        data
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_KYC_FORM]
      })
    }
  })
}
