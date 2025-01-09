import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "@/types/common.type"
import { customRequestHeader } from "@/utils/request-header"
import { loanApplicationKeys } from "@/constants/query-key"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getStatusDisplayName } from "@/modules/loan-application/capital-collab/services"
import { type LoanApplicationStatus } from "@/types/loan-application.type.ts"
import { QUERY_KEY } from "@/modules/dashboard-v2/constants/dashboard.constants"

interface ChangeApplicationStatusRequest {
  applicationId: string
  status: LoanApplicationStatus
}

interface ChangeApplicationStatusResponse {
  success: boolean
}

export const useChangeApplicationStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<ChangeApplicationStatusResponse>,
    AxiosError<ErrorResponse>,
    ChangeApplicationStatusRequest
  >({
    mutationFn: ({ applicationId, status }) =>
      postRequest({
        path: API_PATH.workspaceAdmin.changeApplicationStatus(applicationId),
        customHeader: customRequestHeader.customHeaders,
        data: { request: { status } }
      }),
    onSuccess: (_, { applicationId, status }) => {
      queryClient.invalidateQueries({
        queryKey: loanApplicationKeys.statusDetail(applicationId)
      })
      queryClient.invalidateQueries({ queryKey: loanApplicationKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.DASHBOARD_V2]
      })

      toastSuccess({
        title: TOAST_MSG.workspaceAdmin.changeStatusSuccess.title,
        description: `Application status has been changed to ${getStatusDisplayName(
          status
        )}`
      })
    },
    onError: (e) => {
      toastError({
        title: TOAST_MSG.workspaceAdmin.changeStatusError.title,
        description:
          e.response?.data.message ?? "Something went wrong. Please try again."
      })
    }
  })
}
