import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key"
import { BusinessModelFormResponse } from "../../components/organisms/loan-application-form/business-model/type"
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { FormDetailsQueryProps } from "."

export const useQueryBusinessModelForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<BusinessModelFormResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_BUSINESS_MODEL_FORM],
    enabled,
    path: API_PATH.application.businessModelForm.detail
  })
