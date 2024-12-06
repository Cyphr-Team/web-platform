import { QUERY_KEY } from "../../constants/query-key.ts"
import { API_PATH } from "@/constants"
import { type CurrentLoansInformationResponse } from "../../constants/type.ts"
import { type FormDetailsQueryOptions } from "../form-common"
import { useQueryFormByApplicationId } from "../form-common/useQueryFormByApplicationId.ts"

export const useQueryGetCurrentLoansForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormByApplicationId<CurrentLoansInformationResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_CURRENT_LOANS_FORM],
    enabled,
    path: API_PATH.application.currentLoansForm
  })
