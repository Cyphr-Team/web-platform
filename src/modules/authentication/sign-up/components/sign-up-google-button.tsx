import { ButtonLoading } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { SeparatorWithText } from "@/components/ui/separator-with-text"
import { useSignupWithGoogleMfa } from "@/hooks/signup-with-social/useSignupWithGoogleMfa"
import { googleAuth } from "@/lib/firebase"

export default function SignUpGoogleButton() {
  const IconGoogle = Icons.google
  const { signUpWithGoogleMfa, isLoading: signUpBySocialIsPending } =
    useSignupWithGoogleMfa()

  if (!googleAuth) return ""

  return (
    <>
      <ButtonLoading
        className="w-full text-base"
        isLoading={signUpBySocialIsPending}
        type="button"
        variant="outline"
        onClick={signUpWithGoogleMfa}
      >
        <IconGoogle className="mr-2 h-4 w-4" />
        Sign up with Google
      </ButtonLoading>

      <SeparatorWithText text="or" />
    </>
  )
}
