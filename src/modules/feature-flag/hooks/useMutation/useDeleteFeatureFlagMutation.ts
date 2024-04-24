import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"
import { ErrorResponse } from "react-router-dom"
import { FeatureFlag } from "../../../../types/feature-flag.types"
import { postRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { featureFlagKeys } from "@/constants/query-key"

export const useDeleteFeatureFlagMutation = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<FeatureFlag>,
    AxiosError<ErrorResponse>,
    undefined
  >({
    mutationFn: () => {
      return postRequest({
        path: API_PATH.featureFlag.delete(id)
      })
    },
    onSuccess() {
      toastSuccess(TOAST_MSG.featureFlag.delete)
      queryClient.invalidateQueries({
        queryKey: featureFlagKeys.lists()
      })
    },
    onError(error) {
      toastError({
        ...TOAST_MSG.featureFlag.delete,
        description: getAxiosError(error).message
      })
    }
  })
}
