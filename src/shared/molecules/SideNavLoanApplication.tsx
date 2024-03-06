import { cn } from "@/lib/utils"
import { ASSETS } from "@/assets"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import {
  ARTCAP_MENU,
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_DATA,
  LOAN_APPLICATION_STEP_STATUS
} from "@/modules/loan-application/constants"
import { useLoanApplicationContext } from "@/modules/loan-application/providers"
import { CircularProgress } from "@/components/ui/circular-progress"
import { Check } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoanProgramItem({
  value,
  finished
}: {
  value: LOAN_APPLICATION_STEPS
  finished?: boolean
}) {
  const { changeStep, step } = useLoanApplicationContext()

  const active = step === value
  const label = LOAN_APPLICATION_STEP_DATA[value].label

  //Only allow changing step if it's not active
  const handleChangeStep = () => {
    if (!active) changeStep(value)
  }

  return (
    <li
      className={cn(
        "flex items-center px-2 text-base py-2 gap-3 rounded cursor-pointer",
        active && "bg-lime-400/40"
      )}
      onClick={handleChangeStep}
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
      <AccordionTrigger className="flex-row-reverse w-full px-4 py-2">
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
  const { progress } = useLoanApplicationContext()
  const progressPercent = progress.filter(
    (step) => step.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
  ).length
  const progressText = `${progressPercent}/4`

  const signatureStatus =
    progress[4].status === LOAN_APPLICATION_STEP_STATUS.COMPLETE

  return (
    <div
      className={cn(
        "h-full flex-col hidden md:flex bg-background-disabled absolute left-0 w-96 border-r mb-3xl",
        className
      )}
    >
      <div className="pl-3xl pr-2xl items-center mb-3xl justify-between flex bg-white border-b h-20">
        <div className="flex items-center justify-center gap-1 w-full">
          <img
            src={ASSETS.altCapLogo}
            className="logo w-8 h-8"
            alt="altcap logo"
          />
          <img src={ASSETS.altCapLogoText} alt="altcap logo" className="pt-1" />
        </div>
      </div>

      <div className="px-xl flex-col flex-1 md:flex">
        <Accordion
          type="multiple"
          className="w-full flex flex-col gap-2"
          defaultValue={[ARTCAP_MENU.APPLICATION]}
        >
          <LoanProgramCollapsible
            label={ARTCAP_MENU.APPLICATION}
            progressPercent={progressPercent / 4}
            progressText={progressText}
          >
            <LoanProgramItem
              value={LOAN_APPLICATION_STEPS.LOAN_REQUEST}
              finished={
                progress[0].status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
              }
            />
            <LoanProgramItem
              value={LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION}
              finished={
                progress[1].status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
              }
            />
            <LoanProgramItem
              value={LOAN_APPLICATION_STEPS.OWNER_INFORMATION}
              finished={
                progress[2].status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
              }
            />
            <LoanProgramItem
              value={LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION}
              finished={
                progress[3].status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
              }
            />
          </LoanProgramCollapsible>

          <LoanProgramCollapsible
            label={ARTCAP_MENU.SIGNATURE}
            progressPercent={signatureStatus ? 1 : 0 / 1}
            progressText={`${signatureStatus ? 1 : 0 / 1}/1`}
          >
            <LoanProgramItem
              value={LOAN_APPLICATION_STEPS.CONFIRMATION}
              finished={
                progress[4].status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
              }
            />
          </LoanProgramCollapsible>
        </Accordion>
      </div>
    </div>
  )
}
