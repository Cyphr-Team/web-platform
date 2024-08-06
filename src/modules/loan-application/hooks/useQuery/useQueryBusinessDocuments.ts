import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key"
import { BusinessDocumentsResponse } from "../../constants/type"
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { FormDetailsQueryProps } from "."

export const useQueryBusinessDocuments = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<BusinessDocumentsResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_BUSINESS_DOCUMENTS],
    enabled,
    path: API_PATH.application.businessDocuments.detail
  })
