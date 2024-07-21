import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { QUERY_KEY } from "../../constants/query-key"
import { AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { ProductServiceFormResponse } from "../../components/organisms/loan-application-form/product-service/type"

export const useQueryProductServiceForm = (id: string) => {
  return useQuery<ProductServiceFormResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_PRODUCT_SERVICE_FORM, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.productServiceForm.detail,
        params: { applicationId: id }
      })
    },
    enabled: !!id
  })
}
