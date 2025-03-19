import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type ErrorResponse, type SuccessResponse } from "@/types/common.type"
import { type AxiosError, type AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  loanApplicationKeys,
  workspaceAdminAssignJudge,
  workspaceAdminLoanApplicationScoreKeys
} from "@/constants/query-key"
import { QUERY_KEY } from "@/modules/dashboard-v2/constants/dashboard.constants"

export const useReviewLoanApplication = (applicationId: string) => {
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<SuccessResponse>, AxiosError<ErrorResponse>>(
    {
      mutationFn: () => {
        return putRequest({
          path: API_PATH.loanApplication.reviewLoanApplication(applicationId),
          customHeader: customRequestHeader.customHeaders
        })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: loanApplicationKeys.lists() })
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD_V2] })
        queryClient.invalidateQueries({
          queryKey: workspaceAdminLoanApplicationScoreKeys.lists()
        })

        queryClient.invalidateQueries({
          queryKey: loanApplicationKeys.statusDetail(applicationId)
        })

        queryClient.invalidateQueries({
          queryKey: workspaceAdminAssignJudge.applicationStageStat()
        })
      }
    }
  )
}
