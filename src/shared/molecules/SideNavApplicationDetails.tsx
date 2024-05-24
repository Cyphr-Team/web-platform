import { Accordion } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { Check } from "lucide-react"
import { LogoHeader } from "../atoms/LogoHeader"
import { LoanProgramCollapsible } from "./SideNavLoanApplication"
import {
  ILoanApplicationStep,
  STEP_MENU
} from "@/modules/loan-application/models/LoanApplicationStep/type"

function LoanProgramItem({ value }: { value: ILoanApplicationStep }) {
  return (
    <li className="flex items-center px-2 text-base py-2 gap-3 rounded cursor-pointer">
      <div
        className={cn(
          "w-6 h-6 rounded-md flex justify-center items-center border",
          "ring-2 ring-stone-400/[.14]",
          "bg-active border-0"
        )}
      >
        <Check className="w-5 rounded-md bg-active text-text-senary" />
      </div>
      {value.label}
    </li>
  )
}

export function SideNavApplicationDetails() {
  const { progress } = useLoanApplicationProgressContext()
  const lastStep = progress?.length - 1
  return (
    <div
      className={cn(
        "h-full flex-col hidden md:flex bg-background-disabled w-96 flex-shrink-0 mb-3xl"
      )}
    >
      <div className="pl-3xl pr-2xl items-center mb-4 justify-between flex bg-white border-b h-20">
        <LogoHeader className="justify-center" />
      </div>

      <div className="px-xl flex-col flex-1 md:flex">
        <Accordion
          type="multiple"
          className="w-full flex flex-col gap-2"
          defaultValue={[STEP_MENU.APPLICATION]}
        >
          <LoanProgramCollapsible
            label={STEP_MENU.APPLICATION}
            progressText={`${lastStep}/${lastStep}`}
            progressPercent={1}
          >
            {
              // Render each step in the loan application
              progress.map(
                (step, index) =>
                  index !== lastStep && (
                    <LoanProgramItem key={step.step} value={step} />
                  )
              )
            }
          </LoanProgramCollapsible>

          <LoanProgramCollapsible
            label={STEP_MENU.SIGNATURE}
            progressText={`1/1`}
            progressPercent={1}
          >
            <LoanProgramItem value={progress[lastStep]} />
          </LoanProgramCollapsible>
        </Accordion>
      </div>
    </div>
  )
}
