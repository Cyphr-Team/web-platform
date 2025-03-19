import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { type BusinessDocumentsResponse } from "../../constants/type.ts"
import { useQueryFormByApplicationId } from "../form-common/useQueryFormByApplicationId.ts"
import { type FormDetailsQueryOptions } from "../form-common"

export const useQueryBusinessDocuments = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormByApplicationId<BusinessDocumentsResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_BUSINESS_DOCUMENTS],
    enabled,
    path: API_PATH.application.businessDocuments.detail
  })
