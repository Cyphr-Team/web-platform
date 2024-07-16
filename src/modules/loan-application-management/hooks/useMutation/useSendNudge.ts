import { API_PATH } from "@/constants"
import { TOAST_MSG } from "@/constants/toastMsg"
import { postRequest } from "@/services/client.service"
import { ErrorResponse } from "@/types/common.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import {
  ISendNudgeRequest,
  ISendNudgeResponse
} from "@/types/application/application-nudge.type"
import { workspaceAdminNudgeKeys } from "@/constants/query-key"

export const useSendNudge = (applicationId: string) => {
  const queryClient = useQueryClient()
  const baseUrl = window.location.origin

  return useMutation<
    AxiosResponse<ISendNudgeResponse>,
    AxiosError<ErrorResponse>,
    ISendNudgeRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.workspaceAdmin.sendNudge,
        data: {
          ...data,
          baseUrl: baseUrl
        }
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.workspaceAdmin.sendNudgeSuccess)
      queryClient.invalidateQueries({
        queryKey: workspaceAdminNudgeKeys.getActiveNudges(applicationId)
      })
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.workspaceAdmin.sendNudgeError,
        description: getAxiosError(error).message
      })
    }
  })
}
