import { cn } from "@/lib/utils"
import { ActivateEmailForm } from "./activate-email-form"

export function ActivateEmailSection() {
  return (
    <div className="mx-auto h-auto rounded-[32px] bg-white p-8 shadow-primary md:w-[540px]">
      <div
        className={cn(
          "mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]"
        )}
      >
        <ActivateEmailForm />
      </div>
    </div>
  )
}
