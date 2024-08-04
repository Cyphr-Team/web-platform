import { API_PATH } from "@/constants"
import { putRequest, postRequest } from "@/services/client.service"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"
import { KYCInformationResponse, KYCInformation } from "../../constants/type"
import { formatKycForm } from "../../services/form.services"
import { IOwnerFormValue } from "@/modules/loan-application/constants/form.ts"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { useCallback } from "react"

type Props = {
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
    }
  })
}
