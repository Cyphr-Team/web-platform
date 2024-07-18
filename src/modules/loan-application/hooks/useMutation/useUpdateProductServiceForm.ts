import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { QUERY_KEY } from "../../constants/query-key"
import { ProductServiceFormResponse } from "../../components/organisms/loan-application-form/product-service/type"
import { ProductServiceFormValue } from "../../constants/form"

export const useUpdateProductServiceForm = () => {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<ProductServiceFormResponse>,
    AxiosError<ErrorResponse>,
    ProductServiceFormValue
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.application.productServiceForm.all,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_PRODUCT_SERVICE_FORM]
      })
    }
  })
}
