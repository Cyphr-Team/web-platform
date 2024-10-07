import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { HelpCircle, Plus } from "lucide-react"
import { Link } from "react-router-dom"

export const EmptyApplications = () => {
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
      </div>{" "}
      <Link to={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.all}>
        <Button className="mt-4 bg-lime-400 hover:bg-lime-300 text-text-primary font-semibold text-sm">
          Start Application <Plus className="w-4 h-4 ml-1" />
        </Button>
      </Link>
    </div>
  )
}
