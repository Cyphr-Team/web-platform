import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { QUERY_KEY } from "../../constants/query-key"
import { AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { ExecutionFormResponse } from "../../components/organisms/loan-application-form/execution/type"

export const useQueryExecutionForm = (id: string) => {
  return useQuery<ExecutionFormResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_EXECUTION_FORM, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.executionForm.detail,
        params: { applicationId: id }
      })
    },
    enabled: !!id
  })
}
