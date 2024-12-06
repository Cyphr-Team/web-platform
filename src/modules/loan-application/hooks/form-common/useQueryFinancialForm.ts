import { QUERY_KEY } from "../../constants/query-key"
import { API_PATH } from "@/constants"
import { type FinancialInformationResponse } from "../../constants/type"
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { type FormDetailsQueryOptions } from "."

export const useQueryGetFinancialForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormByApplicationId<FinancialInformationResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_FINANCIAL_FORM],
    enabled: enabled && !!applicationId,
    path: API_PATH.application.financialForm
  })
