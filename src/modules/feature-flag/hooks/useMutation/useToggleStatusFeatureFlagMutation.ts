import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"
import { ErrorResponse } from "react-router-dom"
import { FeatureFlag, FeatureFlagStatus } from "@/types/feature-flag.types.ts"
import { postRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { featureFlagKeys } from "@/constants/query-key"

export const useToggleStatusFeatureFlagMutation = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<FeatureFlag>,
    AxiosError<ErrorResponse>,
    {
      status: FeatureFlagStatus
    }
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.featureFlag.toggleStatus(id),
        data
      })
    },
    onSuccess() {
      toastSuccess(TOAST_MSG.featureFlag.toggleStatus)
      queryClient.invalidateQueries({
        queryKey: featureFlagKeys.lists()
      })
      queryClient.invalidateQueries({
        queryKey: featureFlagKeys.detail(id)
      })
    },
    onError(error) {
      toastError({
        ...TOAST_MSG.featureFlag.toggleStatus,
        description: getAxiosError(error).message
      })
    }
  })
}
