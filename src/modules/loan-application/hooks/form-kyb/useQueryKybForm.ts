import { type KYBInformationResponse } from "../../constants/type.ts"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { API_PATH } from "@/constants"
import { type FormDetailsQueryOptions } from "../form-common"
import { useQueryFormByApplicationId } from "../form-common/useQueryFormByApplicationId.ts"

export const useQueryGetKybForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormByApplicationId<KYBInformationResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_KYB_FORM],
    enabled,
    path: API_PATH.application.kybForm
  })
