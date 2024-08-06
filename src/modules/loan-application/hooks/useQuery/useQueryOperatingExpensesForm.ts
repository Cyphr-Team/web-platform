import { QUERY_KEY } from "../../constants/query-key"
import { API_PATH } from "@/constants"
import { OperatingExpensesInformationResponse } from "../../constants/type"
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { FormDetailsQueryProps } from "."

export const useQueryGetOperatingExpensesForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<OperatingExpensesInformationResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_OPERATING_EXPENSES_FORM],
    enabled,
    path: API_PATH.application.operatingExpensesForm
  })
