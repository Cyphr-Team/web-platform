import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type FeatureFlag } from "../../../../types/feature-flag.types"
import { type ErrorResponse } from "react-router-dom"
import * as z from "zod"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { featureFlagKeys } from "@/constants/query-key"

export const createFeatureFlagForm = z.object({
  key: z.string().min(1, "Key is required."),
  description: z.string().min(1, "Description is required."),
  tags: z.array(z.string())
})

export type CreateFeatureFlagValue = z.infer<typeof createFeatureFlagForm>

export const useCreateFeatureFlagMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<FeatureFlag>,
    AxiosError<ErrorResponse>,
    CreateFeatureFlagValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.featureFlag.create(),
        data
      })
    },
    onSuccess() {
      toastSuccess(TOAST_MSG.featureFlag.create)
      queryClient.invalidateQueries({
        queryKey: featureFlagKeys.lists()
      })
    },
    onError(error) {
      toastError({
        ...TOAST_MSG.featureFlag.create,
        description: getAxiosError(error).message
      })
    }
  })
}
