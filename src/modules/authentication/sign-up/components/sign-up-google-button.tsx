import { ButtonLoading } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { SeparatorWithText } from "@/components/ui/separator-with-text"
import { useLoginWithGoogle } from "@/hooks/login-with-social/useLoginWithGoogle"
import { googleAuth } from "@/lib/firebase"

export default function SignUpGoogleButton() {
  const IconGoogle = Icons["google"]
  const { signInWithGoogle, isLoading } = useLoginWithGoogle()

  if (!googleAuth) return ""

  return (
    <>
      <ButtonLoading
        isLoading={isLoading}
        className="w-full text-base"
        variant="outline"
        type="button"
        onClick={signInWithGoogle}
      >
        <IconGoogle className="mr-2 h-4 w-4" />
        Sign up with Google
      </ButtonLoading>

      <SeparatorWithText text="OR" />
    </>
  )
}
