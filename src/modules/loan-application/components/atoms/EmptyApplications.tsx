import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { HelpCircle, Plus } from "lucide-react"
import { Link } from "react-router-dom"

interface EmptyApplicationsProps {
  hideBtnStart?: boolean
  linkTo?: string
}

export function EmptyApplications({
  hideBtnStart,
  linkTo
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
        <Link to={linkTo ?? APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.all}>
          <Button className="mt-4 bg-lime-400 text-sm font-semibold text-text-primary hover:bg-lime-300">
            Start Application <Plus className="ml-1 size-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}
