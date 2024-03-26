import { cn } from "@/lib/utils"
import { ActivateEmailForm } from "./activate-email-form"

export function ActivateEmailSection() {
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]"
      )}
    >
      <ActivateEmailForm />
    </div>
  )
}
