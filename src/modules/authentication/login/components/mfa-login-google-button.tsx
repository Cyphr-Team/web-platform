import { ButtonLoading } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useLoginWithGoogleMFA } from "@/hooks/login-with-social/useLoginWithGoogleMFA"
import { googleAuth } from "@/lib/firebase"

export function LoginGoogleButtonMFA() {
  const IconGoogle = Icons["google"]
  const { signInWithGoogle, isLoading } = useLoginWithGoogleMFA()

  if (!googleAuth) return ""

  return (
    <ButtonLoading
      isLoading={isLoading}
      className="w-full text-base"
      variant="outline"
      type="button"
      onClick={signInWithGoogle}
    >
      <IconGoogle className="mr-2 h-4 w-4" />
      Sign in with Google
    </ButtonLoading>
  )
}
