import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { FeatureFlag } from "../../../../types/feature-flag.types"
import { ErrorResponse } from "react-router-dom"
import * as z from "zod"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { featureFlagKeys } from "@/constants/query-key"
import { createFeatureFlagForm } from "./useCreateFeatureFlagMutation"

export type UpdateFeatureFlagValue = z.infer<typeof createFeatureFlagForm> & {
  id: string
}

export const useUpdateFeatureFlagMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<FeatureFlag>,
    AxiosError<ErrorResponse>,
    UpdateFeatureFlagValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.featureFlag.update(),
        data
      })
    },
    onSuccess() {
      toastSuccess(TOAST_MSG.featureFlag.update)
      queryClient.invalidateQueries({
        queryKey: featureFlagKeys.lists()
      })
    },
    onError(error) {
      toastError({
        ...TOAST_MSG.featureFlag.update,
        description: getAxiosError(error).message
      })
    }
  })
}
