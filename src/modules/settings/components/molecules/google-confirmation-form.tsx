import { ButtonLoading } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { googleAuth } from "@/lib/firebase"
import { useConfirmUserDeletionWithOAuth } from "@/modules/settings/hooks/useConfirmUserDeletion.ts"

interface VerifyWithGoogleProps {
  onSuccess: VoidFunction
}

export function VerifyWithGoogleForm({ onSuccess }: VerifyWithGoogleProps) {
  const IconGoogle = Icons.google
  const { mutate, isPending } = useConfirmUserDeletionWithOAuth(onSuccess)

  if (!googleAuth) return ""

  return (
    <>
      <p className="text-[#252828]">Please sign in if you want to proceed: </p>
      <ButtonLoading
        className="md:w-2/3 text-md font-semibold"
        isLoading={isPending}
        type="button"
        variant="outline"
        onClick={mutate}
      >
        <IconGoogle className="mr-2 size-4" />
        Sign in with Google
      </ButtonLoading>
    </>
  )
}
