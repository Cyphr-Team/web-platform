import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { useLogout } from "@/hooks/useLogout.ts"

export const useDeleteUser = () => {
  const { signOut } = useLogout()

  return useMutation<AxiosResponse, AxiosError<ErrorResponse>>({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.users.deleteUser,
        data
      })
    },
    async onSuccess() {
      toastSuccess(TOAST_MSG.user.deleteAccount)
      await signOut()
    },
    onError(error) {
      toastError({
        ...TOAST_MSG.user.deleteAccount,
        description: getAxiosError(error).message
      })
    }
  })
}
