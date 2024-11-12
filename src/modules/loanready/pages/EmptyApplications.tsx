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
    <div className="flex flex-col items-center text-center justify-center max-w-80 mx-auto gap-xl mt-5xl">
      <div className="border-2 w-12 h-12 rounded-xl flex items-center">
        <HelpCircle className="w-6 h-6 mx-auto" />
      </div>
      <div>
        <p className="text-text-primary text-md font-semibold">
          No loan applications yet?
        </p>
        <p className="text-text-tertiary text-sm font-normal">
          No worries. Let’s get you started!
        </p>
        <p className="text-text-tertiary text-sm font-normal">
          We’ll guide you through step-by-step.
        </p>
      </div>
      {hideBtnStart ? null : (
        <StartApplicationButton
          className="bg-lime-400 text-black hover:bg-lime-300 font-bold"
          loanProgramId={loanProgramId}
        />
      )}
    </div>
  )
}
