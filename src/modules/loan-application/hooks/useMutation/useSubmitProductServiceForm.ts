import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"

import { ProductServiceFormResponse } from "../../components/organisms/loan-application-form/product-service/type"
import { ProductServiceFormValue } from "../../constants/form"

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
