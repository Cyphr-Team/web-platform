import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { CircularProgress } from "@/components/ui/circular-progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  ILoanApplicationStep,
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import groupBy from "lodash.groupby"
import { Check } from "lucide-react"
import { useMemo } from "react"
import { LogoHeader } from "../atoms/LogoHeader"

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

/**
 * The different between [SideNavApplicationDetails] and [SideNavLoanApplication] is the completeStep condition
 * Because in [BRLoanApplicationDetailsProvider]:
 * - We dont update [confirmationForm] and the status for confirmation is [INCOMPLETE]
 * - If we do, then we will trigger submit loan application from [LoanApplicationFormProvider]
 */
export function LoanProgramCollapsible({
  label,
  progress,
  children
}: React.PropsWithChildren<{
  label: string
  progress: ILoanApplicationStep[]
}>) {
  const completeStep = progress.filter(
    (step) =>
      step.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE ||
      step.step === LOAN_APPLICATION_STEPS.CONFIRMATION
  ).length
  const progressText = `${completeStep}/${progress.length.toString()}`

  return (
    <AccordionItem
      value={label}
      className="w-full bg-white rounded-lg shadow-md"
    >
      <AccordionTrigger
        className="flex-row-reverse w-full px-4 py-2"
        id={`parent-step-${label.toLowerCase()}`}
      >
        <div className="flex items-center justify-between flex-1 ml-3 font-semibold">
          <div>{label}</div>
          <div>
            <CircularProgress
              percent={completeStep / progress.length}
              text={progressText}
            />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-0">
        <Separator />
        <ul className="px-2 py-4 gap-1 flex flex-col">
          {/* Render each step in the loan application */}
          {children}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

export function SideNavApplicationDetails() {
  const { progress } = useLoanApplicationProgressContext()

  const menuGroupByParent = useMemo(() => {
    return groupBy(progress, (x) => {
      return x.parent
    })
  }, [progress])

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
          key={progress.length}
          type="multiple"
          className="w-full flex flex-col gap-2"
          defaultValue={Object.keys(menuGroupByParent)}
        >
          {Object.keys(menuGroupByParent).map((parentMenu) => (
            <LoanProgramCollapsible
              key={parentMenu}
              label={parentMenu}
              progress={menuGroupByParent[parentMenu]}
            >
              {menuGroupByParent[parentMenu].map((step) => (
                <LoanProgramItem key={step.step} value={step} />
              ))}
            </LoanProgramCollapsible>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
