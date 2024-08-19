import { cn } from "@/lib/utils"
import { ActivateEmailForm } from "./activate-email-form"

export function ActivateEmailSection() {
  return (
    <div className="rounded-[32px] shadow-primary md:w-[540px] mx-auto h-auto p-8 bg-white">
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
