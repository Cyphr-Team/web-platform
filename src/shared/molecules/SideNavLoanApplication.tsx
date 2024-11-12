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
  type ILoanApplicationStep,
  LOAN_APPLICATION_STEP_STATUS,
  STEP_MENU
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { LoanProgressAction } from "@/modules/loan-application/providers/LoanProgressProvider"
import groupBy from "lodash.groupby"
import { Check } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { LogoHeader } from "../atoms/LogoHeader"
import { isLoanReady } from "@/utils/domain.utils"

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

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
        type: LoanProgressAction.ChangeStep,
        step: value.step
      })
  }

  return (
    <li
      className={cn(
        "flex items-center px-2 py-2 gap-3 rounded-md cursor-pointer text-sm font-medium",
        active && "bg-nav-active"
      )}
      id={`step-${value.step}`}
      onClick={handleChangeStep}
    >
      <div
        className={cn(
          "w-5 h-5 rounded-[3px] border-2 flex justify-center items-center border-text-senary flex-shrink-0",
          finished && "bg-brand-primary-gray border-0"
        )}
      >
        <Check
          className={cn("w-4 text-white", !finished && "hidden")}
          strokeWidth={4}
        />
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
      className="w-full rounded-lg bg-white shadow-md"
      value={label}
    >
      <AccordionTrigger
        className="w-full flex-row-reverse px-4 py-2"
        id={`parent-step-${label.toLowerCase()}`}
      >
        <div className="ml-3 flex flex-1 items-center justify-between font-semibold">
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
        <ul className="flex flex-col gap-1 px-2 py-4">
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
      <div className="mb-4 flex h-20 items-center justify-between border-b bg-white pl-3xl pr-2xl">
        <LogoHeader className="justify-center" isLarge={isLoanReady()} />
      </div>

      <div className="max-h-[50vh] flex-1 flex-col overflow-y-scroll px-xl pb-4 md:flex md:max-h-full">
        <Accordion
          className="flex w-full flex-col gap-2"
          type="multiple"
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
                  finished={
                    step.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
                  }
                  value={step}
                />
              ))}
            </LoanProgramCollapsible>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
