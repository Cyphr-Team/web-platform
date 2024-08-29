import { API_PATH } from "@/constants"
import { postRequest, putRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"
import { KYBInformationResponse, KYBInformation } from "../../constants/type"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { useCallback } from "react"
import {
  SbbKybFormPartOneValue,
  SbbKybFormPartTwoValue
} from "../../components/organisms/loan-application-form/kyb/sbb/const"
import { get } from "lodash"

type SbbKybFormValue = SbbKybFormPartOneValue & SbbKybFormPartTwoValue

type Props = {
  rawData: SbbKybFormValue
  onSuccess: (data: KYBInformationResponse) => void
}
const ignoreKybData = {
  city: "ignore",
  state: "XX",
  postalCode: "ignore"
}

const formatKybForm = (data: SbbKybFormValue) => {
  return {
    ...data,
    businessStreetAddress: {
      addressLine1: data.addressLine1,
      addressLine2: get(data, "addressLine2", ""),
      ...ignoreKybData
    },
    businessWebsite: data.businessWebsite?.length
      ? data.businessWebsite
      : undefined,
    metadata: {
      ...data
    }
  }
}

export const useSubmitSbbLoanKYBForm = ({ rawData, onSuccess }: Props) => {
  const { mutateAsync: updateLoanKyb, isPending: isUpdatingLoanKyb } =
    useUpdate()

  const { mutateAsync: submitLoanKyb, isPending: isSubmittingLoanKyb } =
    useSubmit()

  const onSubmitSuccess = useCallback(
    (data: KYBInformationResponse) => onSuccess(data),
    [onSuccess]
  )

  // Call API
  const submitSbbLoanKYBForm = async (loanApplicationId: string) => {
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
    submitSbbLoanKYBForm
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
