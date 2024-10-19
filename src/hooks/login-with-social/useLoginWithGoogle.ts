import { SocialProvider } from "@/types/auth.type"
import { googleAuth, googleAuthProvider } from "@/lib/firebase"
import { useMutation } from "@tanstack/react-query"
import { signInWithPopup } from "firebase/auth"
import { useCallback } from "react"
import { useLoginWithSocial } from "./useLoginWithSocial"

export const useLoginWithGoogle = () => {
  const { mutate: loginBySocialMutate, isPending: loginBySocialIsPending } =
    useLoginWithSocial()

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!googleAuth) throw new Error("Login with google is not support")

      return signInWithPopup(googleAuth, googleAuthProvider)
    },
    async onSuccess(data) {
      const token = await data.user.getIdToken()

      loginBySocialMutate({ provider: SocialProvider.GOOGLE, token })
    }
  })

  const signInWithGoogle = useCallback(async () => {
    mutate()
  }, [mutate])

  return { signInWithGoogle, isLoading: loginBySocialIsPending || isPending }
}
