import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type ProductServiceFormValue } from "../../constants/form.ts"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ProductServiceFormResponse } from "../../components/organisms/loan-application-form/product-service/type.ts"
import { type ErrorResponse } from "@/types/common.type.ts"
import { postRequest, putRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { useCallback } from "react"

interface Props {
  rawData: ProductServiceFormValue
  onSuccess: (data: ProductServiceFormResponse) => void
}

export const useSubmitLoanProductServiceForm = ({
  rawData,
  onSuccess
}: Props) => {
  const { mutateAsync: update, isPending: isUpdating } = useUpdate()

  const { mutateAsync: submit, isPending: isSubmitting } = useSubmit()

  const onSubmitSuccess = useCallback(
    (data: ProductServiceFormResponse) => onSuccess(data),
    [onSuccess]
  )
  const submitProductServiceForm = async () => {
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
    submitProductServiceForm
  }
}

const useUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<ProductServiceFormResponse>,
    AxiosError<ErrorResponse>,
    ProductServiceFormValue
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.productServiceForm.all,
        data
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_PRODUCT_SERVICE_FORM]
      })
    }
  })
}

const useSubmit = () => {
  return useMutation<
    AxiosResponse<ProductServiceFormResponse>,
    AxiosError<ErrorResponse>,
    ProductServiceFormValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.productServiceForm.all,
        data
      })
    }
  })
}
