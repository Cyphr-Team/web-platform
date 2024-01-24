import { ActivateEmailForm } from "./activate-email-form"
import { UserStartStatus } from "../../sign-up/hooks/useGetStart"
import { cn } from "@/lib/utils"
import { useActiveEmailSearchParams } from "../hooks/useActiveEmailSearchParams"

export function ActivateEmailSection() {
  const { status } = useActiveEmailSearchParams()

  const isWaitingSetupProfile =
    status === UserStartStatus.USER_WAITING_SETUP_PROFILE
  const isEmailRegistered = status === UserStartStatus.EMAIL_REGISTERED

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]",
        (isWaitingSetupProfile || isEmailRegistered) && "space-y-4"
      )}
    >
      <ActivateEmailForm />
    </div>
  )
}
