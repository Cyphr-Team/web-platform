import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"
import { ErrorResponse } from "react-router-dom"
import {
  FeatureFlag,
  FeatureFlagRolloutType
} from "@/types/feature-flag.types.ts"
import { postRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { featureFlagKeys } from "@/constants/query-key"

export const useToggleRolloutTypeFeatureFlagMutation = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<FeatureFlag>,
    AxiosError<ErrorResponse>,
    {
      rolloutType: FeatureFlagRolloutType
    }
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.featureFlag.toggleRolloutType(id),
        data
      })
    },
    onSuccess() {
      toastSuccess(TOAST_MSG.featureFlag.toggleWhitelist)
      queryClient.invalidateQueries({
        queryKey: featureFlagKeys.lists()
      })
      queryClient.invalidateQueries({
        queryKey: featureFlagKeys.detail(id)
      })
    },
    onError(error) {
      toastError({
        ...TOAST_MSG.featureFlag.toggleWhitelist,
        description: getAxiosError(error).message
      })
    }
  })
}
