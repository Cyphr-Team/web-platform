import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key"
import { type ProductServiceFormResponse } from "../../components/organisms/loan-application-form/product-service/type"
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { type FormDetailsQueryOptions } from "."

export const useQueryProductServiceForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormByApplicationId<ProductServiceFormResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_PRODUCT_SERVICE_FORM],
    enabled,
    path: API_PATH.application.productServiceForm.detail
  })
