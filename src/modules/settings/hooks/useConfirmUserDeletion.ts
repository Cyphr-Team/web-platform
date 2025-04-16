import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { z } from "zod"
import { googleAuth, googleAuthProvider } from "@/lib/firebase.ts"
import { signInWithPopup, type User } from "firebase/auth"
import { useCallback, useState } from "react"
import { useGetUserInformation } from "@/hooks/useGetUserInformation.ts"

const confirmDeleteWithPasswordFormSchema = z.object({
  inputPassword: z.string().min(1, "Password is required")
})

export type ConfirmDeleteWithPasswordFormValue = z.infer<
  typeof confirmDeleteWithPasswordFormSchema
>

export const useConfirmUserDeletionWithPassword = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<ErrorResponse>,
    ConfirmDeleteWithPasswordFormValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.users.confirmUserDeletion,
        data
      })
    },
    onSuccess() {
      toastSuccess(TOAST_MSG.user.verifyAccount)
    },
    onError(error) {
      toastError({
        ...TOAST_MSG.user.verifyAccount,
        description: getAxiosError(error).message
      })
    }
  })
}

export const useConfirmUserDeletionWithOAuth = (onSuccess: VoidFunction) => {
  const { data: currentUser } = useGetUserInformation()
  const [userVerified, setUserVerified] = useState<User | null>(null)
  const { mutate: mutateLoginWithGoogle, isPending } = useMutation({
    mutationFn: () => {
      if (!googleAuth) throw new Error("Login with google is not supported")

      return signInWithPopup(googleAuth, googleAuthProvider)
    },
    onSuccess(data) {
      if (data.user.email !== currentUser?.email) {
        toastError({
          ...TOAST_MSG.user.verifyAccount,
          description: "Your verified email does not match with this account"
        })
        setUserVerified(data.user)

        return
      }
      toastSuccess(TOAST_MSG.user.verifyAccount)
      onSuccess()
    },
    onError() {
      toastError({
        ...TOAST_MSG.user.verifyAccount,
        description: "Failed to verify with Google Authentication"
      })
    }
  })

  const mutate = useCallback(async () => {
    mutateLoginWithGoogle()
  }, [mutateLoginWithGoogle])

  return {
    mutate,
    userVerified,
    isPending
  }
}
