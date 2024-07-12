import { API_PATH } from "@/constants"
import {
  loanApplicationKeys,
  workspaceAdminAssignJudge,
  workspaceAdminLoanApplicationScoreKeys
} from "@/constants/query-key"
import { QUERY_KEY as QUERY_KEY_DASHBOARD } from "@/modules/dashboard-v2/constants/dashboard.constants"
import {
  LoanDecisionResponse,
  SelectRoundLoanApplication
} from "@/modules/loan-application-management/constants/types/application.ts"
import { postRequest } from "@/services/client.service"
import { ErrorResponse } from "@/types/common.type"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

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
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: workspaceAdminAssignJudge.assignableJudges(
          params?.applicationId
        )
      })

      queryClient.invalidateQueries({
        queryKey:
          workspaceAdminAssignJudge.getApplicationWithStageScoresResponse(
            params?.applicationId
          )
      })

      queryClient.invalidateQueries({
        queryKey: workspaceAdminLoanApplicationScoreKeys.lists()
      })

      queryClient.invalidateQueries({
        queryKey: loanApplicationKeys.statusDetail(params?.applicationId)
      })

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_DASHBOARD.DASHBOARD_V2]
      })
    }
  })
}
