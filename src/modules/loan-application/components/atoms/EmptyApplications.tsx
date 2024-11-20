import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { FileText, HelpCircle, Plus } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useFinancialToolkitStore } from "@/modules/legacy-financial-projection/stores/useFinancialToolkitStore.ts"
import { toast } from "sonner"

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

export function UnusedReportBanner({ purchaseDate = new Date() }) {
  const navigate = useNavigate()
  const x = useFinancialToolkitStore()

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(date)
  }

  return (
    <div className="w-full bg-blue-50 border border-blue-100 rounded-lg">
      <div className="p-4 flex items-center justify-between">
        {/* Left section with icon and title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">
              You have unused application slot ready to use
            </p>
          </div>
        </div>

        {/* Middle section with details */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-sm font-medium text-blue-600">Unused</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-sm text-gray-600">
              Purchased on {formatDate(purchaseDate)}
            </div>
          </div>
        </div>

        <Button
          className="gap-2"
          type="button"
          onClick={() => {
            navigate(
              "/loan/loan-program/e0f70f20-da08-4567-964b-cfdc12d94d1a/information"
            )
            if (x.ching !== null) toast.dismiss(x.ching)
            x.action.chong(null)
          }}
        >
          Start application
        </Button>
      </div>
    </div>
  )
}
