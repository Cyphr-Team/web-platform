import { Button } from "@/components/ui/button"
import { LOAN_APPLICATION_STEPS } from "../../constants"
import { useLoanApplicationProgressContext } from "../../providers"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { LOAN_PROGRESS_ACTION } from "../../providers/LoanProgressProvider"

export function LoanApplicationStepNavigate() {
  const { dispatchProgress, currentStep } = useLoanApplicationProgressContext()

  const changeStep = (step: LOAN_APPLICATION_STEPS) => {
    dispatchProgress({ type: LOAN_PROGRESS_ACTION.CHANGE_STEP, step })
  }

  return (
    <div className="mb-2 gap-2 grid grid-cols-8">
      <div
        className={cn(
          "flex justify-between items-center mx-4 col-span-8",
          "md:col-span-4 md:col-start-3 md:mx-0"
        )}
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-lg"
          disabled={!currentStep?.previousStep}
          onClick={() => {
            currentStep?.previousStep && changeStep(currentStep.previousStep)
          }}
        >
          <ChevronLeft className="w-5" />
        </Button>

        <span
          className={cn("text-xl font-semibold text-center", "md:text-2xl")}
        >
          {currentStep?.label}
        </span>

        <Button
          variant="outline"
          size="icon"
          className="rounded-lg"
          disabled={!currentStep?.nextStep}
          onClick={() => {
            currentStep?.nextStep && changeStep(currentStep.nextStep)
          }}
        >
          <ChevronRight className="w-5" />
        </Button>
      </div>
    </div>
  )
}
