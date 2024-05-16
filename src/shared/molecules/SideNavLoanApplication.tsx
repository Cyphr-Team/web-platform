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
  ARTCAP_MENU,
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS
} from "@/modules/loan-application/constants"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { Check } from "lucide-react"
import { LogoHeader } from "../atoms/LogoHeader"
import { LOAN_PROGRESS_ACTION } from "@/modules/loan-application/providers/LoanProgressProvider"
import { isEnableCashFlowV2 } from "@/utils/feature-flag.utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoanProgramItem({
  value,
  finished
}: Readonly<{
  value: LOAN_APPLICATION_STEPS
  finished?: boolean
}>) {
  const { dispatchProgress, step, getStep } =
    useLoanApplicationProgressContext()

  const active = step === value
  const label = getStep(value)?.label

  //Only allow changing step if it's not active
  const handleChangeStep = () => {
    if (!active)
      dispatchProgress({
        type: LOAN_PROGRESS_ACTION.CHANGE_STEP,
        step: value
      })
  }

  return (
    <li
      className={cn(
        "flex items-center px-2 text-base py-2 gap-3 rounded cursor-pointer",
        active && "bg-lime-400/40"
      )}
      onClick={handleChangeStep}
      id={`step-${value}`}
    >
      <div
        className={cn(
          "w-6 h-6 rounded-md bg-white flex justify-center items-center border",
          active && "ring-4 ring-stone-400/[.14]",
          finished && "bg-primary border-0"
        )}
      >
        <Check className={cn("w-5 text-white", !finished && "hidden")} />
      </div>
      {label}
    </li>
  )
}

export function LoanProgramCollapsible({
  label,
  progressPercent,
  progressText,
  children
}: React.PropsWithChildren<{
  label: string
  progressPercent: number
  progressText: string
}>) {
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
            <CircularProgress percent={progressPercent} text={progressText} />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-0">
        <Separator />
        <ul className="px-2 py-4 gap-1 flex flex-col">{children}</ul>
      </AccordionContent>
    </AccordionItem>
  )
}

export function SideNavLoanApplication({ className }: SidebarProps) {
  const { progress, getStepStatus } = useLoanApplicationProgressContext()

  const progressPercent = progress.filter(
    (step) => step.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
  ).length
  const progressText = `${progressPercent}/${isEnableCashFlowV2() ? "6" : "4"}`

  const signatureStatus = getStepStatus(LOAN_APPLICATION_STEPS.CONFIRMATION)

  const confirmationStep = progress[progress.length - 1]

  return (
    <div
      className={cn(
        "h-full flex-col hidden md:flex bg-background-disabled w-96 flex-shrink-0 border-r mb-3xl",
        className
      )}
    >
      <div className="pl-3xl pr-2xl items-center mb-3xl justify-between flex bg-white border-b h-20">
        <LogoHeader className="justify-center" />
      </div>

      <div className="px-xl flex-col flex-1 md:flex">
        <Accordion
          type="multiple"
          className="w-full flex flex-col gap-2"
          defaultValue={[ARTCAP_MENU.APPLICATION]}
        >
          <LoanProgramCollapsible
            label={ARTCAP_MENU.APPLICATION}
            progressPercent={progressPercent / (isEnableCashFlowV2() ? 6 : 4)}
            progressText={progressText}
          >
            {
              // Render each step in the loan application
              progress.map(
                (step, index) =>
                  index !== progress.length - 1 && (
                    <LoanProgramItem
                      key={step.step}
                      value={step.step}
                      finished={
                        step.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
                      }
                    />
                  )
              )
            }
          </LoanProgramCollapsible>

          <LoanProgramCollapsible
            label={ARTCAP_MENU.SIGNATURE}
            progressPercent={signatureStatus ? 1 : 0 / 1}
            progressText={`${signatureStatus ? 1 : 0 / 1}/1`}
          >
            <LoanProgramItem
              value={confirmationStep?.step}
              finished={
                confirmationStep?.status ===
                LOAN_APPLICATION_STEP_STATUS.COMPLETE
              }
            />
          </LoanProgramCollapsible>
        </Accordion>
      </div>
    </div>
  )
}
