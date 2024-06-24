import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type.ts"
import { AxiosError, AxiosResponse } from "axios"
import { WhitelistedUserResponse } from "@/types/user.type.ts"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { whitelistUserKeys } from "@/constants/query-key.ts"
import { getAxiosError } from "@/utils/custom-error.ts"
import * as z from "zod"

export const updateWhitelistValue = z.object({
  featureFlagId: z.string().min(1, "Feature Flag id is required."),
  whitelist: z.array(z.string())
})

export type UpdateWhitelistValue = z.infer<typeof updateWhitelistValue>

export const useUpdateWhitelistUser = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<WhitelistedUserResponse>,
    AxiosError<ErrorResponse>,
    UpdateWhitelistValue
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.whitelistUser.update(),
        data: data
      })
    },
    onSuccess: (_, req) => {
      queryClient.invalidateQueries({
        queryKey: whitelistUserKeys.detail(req.featureFlagId)
      })
      toastSuccess(TOAST_MSG.whitelistUser.update)
    },
    onError: (error) => {
      const axiosError = getAxiosError(error)
      toastError({
        ...TOAST_MSG.whitelistUser.update,
        description: axiosError.message
      })
    }
  })
}
