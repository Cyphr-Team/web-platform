import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { type AxiosError, type AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"

import { type ProductServiceFormResponse } from "../../components/organisms/loan-application-form/product-service/type"
import { type ProductServiceFormValue } from "../../constants/form"

export const useSubmitProductServiceForm = () => {
  return useMutation<
    AxiosResponse<ProductServiceFormResponse>,
    AxiosError<ErrorResponse>,
    ProductServiceFormValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.productServiceForm.all,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
