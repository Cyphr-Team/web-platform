import { API_PATH } from "@/constants"
import { FormDetailsQueryProps } from "."
import { ExecutionFormResponse } from "../../components/organisms/loan-application-form/execution/type"
import { QUERY_KEY } from "../../constants/query-key"
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"

export const useQueryExecutionForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) => {
  return useQueryFormByApplicationId<ExecutionFormResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_EXECUTION_FORM],
    enabled,
    path: API_PATH.application.executionForm.detail
  })
}
