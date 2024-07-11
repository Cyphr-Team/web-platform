import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { loanApplicationKeys } from "@/constants/query-key"
import { QUERY_KEY } from "@/modules/dashboard-v2/constants/dashboard.constants"
import {
  LoanDecisionResponse,
  SelectRoundLoanApplication
} from "@/modules/loan-application-management/constants/types/application.ts"

export const useSelectRoundLoanApplication = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<LoanDecisionResponse>,
    AxiosError<ErrorResponse>,
    SelectRoundLoanApplication
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.workspaceAdmin.selectRoundLoanApplication,
        customHeader: customRequestHeader.customHeaders,
        data
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loanApplicationKeys.lists() })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD_V2] })
    }
  })
}
