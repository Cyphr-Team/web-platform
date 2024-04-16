import { Button } from "@/components/ui/button"
import {
  LOAN_APPLICATION_STEP_DATA,
  LOAN_APPLICATION_STEPS
} from "../../constants"
import { useLoanApplicationProgressContext } from "../../providers"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { LOAN_PROGRESS_ACTION } from "../../providers/LoanProgressProvider"

export function LoanApplicationStepNavigate() {
  const { step, dispatch } = useLoanApplicationProgressContext()

  const stepData = LOAN_APPLICATION_STEP_DATA[step]

  const changeStep = (step: LOAN_APPLICATION_STEPS) => {
    dispatch({ type: LOAN_PROGRESS_ACTION.CHANGE_STEP, step })
  }

  return (
    <div className="mb-2 gap-2 grid grid-cols-8">
      <div className="flex justify-between items-center col-span-4 col-start-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-lg"
          disabled={!stepData.previousStep}
          onClick={() => {
            changeStep(stepData.previousStep)
          }}
        >
          <ChevronLeft className="w-5" />
        </Button>

        <span className="text-2xl font-semibold text-center">
          {stepData.label}
        </span>

        <Button
          variant="outline"
          size="icon"
          className="rounded-lg"
          disabled={!stepData.nextStep}
          onClick={() => {
            changeStep(stepData.nextStep)
          }}
        >
          <ChevronRight className="w-5" />
        </Button>
      </div>
    </div>
  )
}
