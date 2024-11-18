import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { CircularProgress } from "@/components/ui/circular-progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { type ILoanApplicationStep } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import groupBy from "lodash.groupby"
import { Check } from "lucide-react"
import { useMemo } from "react"
import { LogoHeader } from "../atoms/LogoHeader"

function LoanProgramItem({ value }: { value: ILoanApplicationStep }) {
  return (
    <li className="flex cursor-pointer items-center gap-3 rounded p-2 text-base">
      <div
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-md",
          "ring-2 ring-stone-400/[.14]",
          "border-0 bg-active"
        )}
      >
        <Check className="w-5 rounded-md bg-active text-text-senary" />
      </div>
      {value.label}
    </li>
  )
}

/**
 In the loan application details, all the steps MUST be finished
 */
function LoanProgramCollapsible({
  label,
  progress,
  children
}: React.PropsWithChildren<{
  label: string
  progress: ILoanApplicationStep[]
}>) {
  const progressText = `${progress.length.toString()}/${progress.length.toString()}`

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
            <CircularProgress percent={1} text={progressText} />
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
        "mb-3xl hidden h-full w-96 shrink-0 flex-col bg-background-disabled md:flex"
      )}
    >
      <div className="mb-4 flex h-20 items-center justify-between border-b bg-white pl-3xl pr-2xl">
        <LogoHeader className="justify-center" />
      </div>

      <div className="flex-1 flex-col overflow-y-scroll px-xl pb-4 md:flex">
        <Accordion
          key={progress.length}
          className="flex w-full flex-col gap-2"
          defaultValue={Object.keys(menuGroupByParent)}
          type="multiple"
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
