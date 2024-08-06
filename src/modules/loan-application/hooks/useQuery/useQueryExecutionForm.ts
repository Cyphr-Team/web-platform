import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key"
import { ExecutionFormResponse } from "../../components/organisms/loan-application-form/execution/type"
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { FormDetailsQueryProps } from "."

export const useQueryExecutionForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<ExecutionFormResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_EXECUTION_FORM],
    enabled,
    path: API_PATH.application.executionForm.detail
  })
