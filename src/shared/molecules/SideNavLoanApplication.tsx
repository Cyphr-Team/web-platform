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
  LOAN_APPLICATION_STEP_STATUS,
  STEP_MENU
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { LOAN_PROGRESS_ACTION } from "@/modules/loan-application/providers/LoanProgressProvider"
import groupBy from "lodash.groupby"
import { Check } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { LogoHeader } from "../atoms/LogoHeader"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoanProgramItem({
  value,
  finished
}: Readonly<{
  value: ILoanApplicationStep
  finished?: boolean
}>) {
  const { dispatchProgress, step } = useLoanApplicationProgressContext()

  const active = step === value.step

  //Only allow changing step if it's not active
  const handleChangeStep = () => {
    if (!active)
      dispatchProgress({
        type: LOAN_PROGRESS_ACTION.CHANGE_STEP,
        step: value.step
      })
  }

  return (
    <li
      className={cn(
        "flex items-center px-2 text-base py-2 gap-3 rounded cursor-pointer",
        active && "bg-nav-active"
      )}
      onClick={handleChangeStep}
      id={`step-${value.step}`}
    >
      <div
        className={cn(
          "w-6 h-6 rounded-md bg-white flex justify-center items-center border flex-shrink-0",
          active && "ring-4 ring-stone-400/[.14]",
          finished && "bg-primary border-0"
        )}
      >
        <Check className={cn("w-5 text-white", !finished && "hidden")} />
      </div>
      {value.label}
    </li>
  )
}

function LoanProgramCollapsible({
  label,
  progress,
  children
}: React.PropsWithChildren<{
  label: string
  progress: ILoanApplicationStep[]
}>) {
  const completeStep = progress.filter(
    (step) => step.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
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

export function SideNavLoanApplication({ className }: SidebarProps) {
  const { progress, getCurrentStep } = useLoanApplicationProgressContext()

  const [accordionValue, setAccordionValue] = useState([STEP_MENU.APPLICATION])

  const menuGroupByParent = useMemo(() => {
    return groupBy(progress, (x) => {
      return x.parent
    })
  }, [progress])

  /**
   * Listen the step change, if the next step is inside next parent, toggle down the parent
   */
  useEffect(() => {
    const currentStep = getCurrentStep()
    if (currentStep?.parent) {
      setAccordionValue((preOpens) =>
        preOpens.includes(currentStep.parent)
          ? preOpens
          : [...preOpens, currentStep.parent]
      )
    }
  }, [getCurrentStep])

  return (
    <div
      className={cn(
        "h-full flex-col hidden md:flex bg-background-disabled w-96 flex-shrink-0 shadow-sm mb-3xl",
        className
      )}
    >
      <div className="pl-3xl pr-2xl items-center mb-4 justify-between flex bg-white border-b h-20">
        <LogoHeader className="justify-center" />
      </div>

      <div className="px-xl flex-col flex-1 md:flex overflow-y-scroll pb-4 max-h-[50vh] md:max-h-full">
        <Accordion
          type="multiple"
          className="w-full flex flex-col gap-2"
          value={accordionValue}
          onValueChange={(opens) => {
            setAccordionValue(opens as STEP_MENU[])
          }}
        >
          {Object.keys(menuGroupByParent).map((parentMenu) => (
            <LoanProgramCollapsible
              key={parentMenu}
              label={parentMenu}
              progress={menuGroupByParent[parentMenu]}
            >
              {menuGroupByParent[parentMenu].map((step) => (
                <LoanProgramItem
                  key={step.step}
                  value={step}
                  finished={
                    step.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
                  }
                />
              ))}
            </LoanProgramCollapsible>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
