import { Button } from "@/components/ui/button"
import { LOAN_APPLICATION_STEP_DATA } from "../../constants"
import { useLoanApplicationContext } from "../../providers"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function LoanApplicationStepNavigate() {
  const { step, changeStep } = useLoanApplicationContext()
  const stepData = LOAN_APPLICATION_STEP_DATA[step]

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
          disabled={!stepData.previousStep}
          onClick={() => {
            changeStep(stepData.previousStep)
          }}
        >
          <ChevronLeft className="w-5" />
        </Button>

        <span
          className={cn("text-xl font-semibold text-center", "md:text-2xl")}
        >
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
