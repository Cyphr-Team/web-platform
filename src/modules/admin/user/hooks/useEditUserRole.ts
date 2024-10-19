import { API_PATH } from "@/constants"
import * as z from "zod"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { type UserInfo, type UserRoles } from "@/types/user.type"
import { type AxiosError, type AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { userKeys } from "@/constants/query-key.ts"
import { createSearchParams } from "react-router-dom"

export const adminEditUserRoleForm = z.object({
  userId: z.string().min(1, "Please select a userId."),
  newRoles: z.array(z.string())
})

export type AdminEditUserRoleValue = z.infer<typeof adminEditUserRoleForm>

export const useEditUserRole = ({
  userId,
  roles
}: {
  userId: string
  roles: UserRoles[]
}) => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<UserInfo>,
    AxiosError<ErrorResponse>,
    AdminEditUserRoleValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.admin.user.updateRoles,
        data: { ...data, userId, roles },
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(createSearchParams(userId).toString())
      })
      toastSuccess(TOAST_MSG.user.editUserRole)
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.user.editUserRole,
        description: getAxiosError(error).message
      })
    }
  })
}
