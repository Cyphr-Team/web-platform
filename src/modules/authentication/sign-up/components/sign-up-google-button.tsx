import { ButtonLoading } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { SeparatorWithText } from "@/components/ui/separator-with-text"
import { useLoginWithGoogle } from "@/hooks/login-with-social/useLoginWithGoogle"
import { useSignupWithGoogleMfa } from "@/hooks/signup-with-social/useSignupWithGoogleMfa"
import { googleAuth } from "@/lib/firebase"
import { isEnableMFA } from "@/services/jwt.service"

export default function SignUpGoogleButton() {
  const IconGoogle = Icons["google"]
  const { signInWithGoogle, isLoading: loginBySocialIsPending } =
    useLoginWithGoogle()
  const { signUpWithGoogleMfa, isLoading: signUpBySocialIsPending } =
    useSignupWithGoogleMfa()

  if (!googleAuth) return ""

  return (
    <>
      <ButtonLoading
        isLoading={
          isEnableMFA() ? signUpBySocialIsPending : loginBySocialIsPending
        }
        className="w-full text-base"
        variant="outline"
        type="button"
        onClick={isEnableMFA() ? signUpWithGoogleMfa : signInWithGoogle}
      >
        <IconGoogle className="mr-2 h-4 w-4" />
        Sign up with Google
      </ButtonLoading>

      <SeparatorWithText text="or" />
    </>
  )
}
