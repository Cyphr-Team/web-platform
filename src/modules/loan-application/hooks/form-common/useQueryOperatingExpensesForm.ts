import { QUERY_KEY } from "../../constants/query-key"
import { API_PATH } from "@/constants"
import { type OperatingExpensesInformationResponse } from "../../constants/type"
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { type FormDetailsQueryOptions } from "."

export const useQueryGetOperatingExpensesForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormByApplicationId<OperatingExpensesInformationResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_OPERATING_EXPENSES_FORM],
    enabled,
    path: API_PATH.application.operatingExpensesForm
  })
