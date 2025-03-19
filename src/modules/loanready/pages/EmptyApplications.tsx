import { StartApplicationButton } from "@/modules/loanready/components/molecules/StartApplicationButton"
import { HelpCircle } from "lucide-react"

interface EmptyApplicationsProps {
  hideBtnStart?: boolean
  loanProgramId?: string
}

export function EmptyApplications({
  hideBtnStart,
  loanProgramId
}: EmptyApplicationsProps) {
  return (
    <div className="mx-auto mt-5xl flex max-w-80 flex-col items-center justify-center gap-xl text-center">
      <div className="flex size-12 items-center rounded-xl border-2">
        <HelpCircle className="mx-auto size-6" />
      </div>
      <div>
        <p className="text-md font-semibold text-text-primary">
          No loan applications yet?
        </p>
        <p className="text-sm font-normal text-text-tertiary">
          No worries. Let’s get you started!
        </p>
        <p className="text-sm font-normal text-text-tertiary">
          We’ll guide you through step-by-step.
        </p>
      </div>
      {hideBtnStart ? null : (
        <StartApplicationButton
          className="bg-lime-400 font-bold text-black hover:bg-lime-300"
          loanProgramId={loanProgramId}
        />
      )}
    </div>
  )
}
