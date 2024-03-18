import { Accordion } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import {
  ARTCAP_MENU,
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_DATA
} from "@/modules/loan-application/constants"
import { Check } from "lucide-react"
import { LogoHeader } from "../atoms/LogoHeader"
import { LoanProgramCollapsible } from "./SideNavLoanApplication"

function LoanProgramItem({ value }: { value: LOAN_APPLICATION_STEPS }) {
  const label = LOAN_APPLICATION_STEP_DATA[value].label

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
      {label}
    </li>
  )
}

export function SideNavApplicationDetails() {
  return (
    <div
      className={cn(
        "h-full flex-col hidden md:flex bg-background-disabled absolute left-0 w-96 border-r mb-3xl"
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
            progressText={`4/4`}
            progressPercent={1}
          >
            <LoanProgramItem value={LOAN_APPLICATION_STEPS.LOAN_REQUEST} />
            <LoanProgramItem
              value={LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION}
            />
            <LoanProgramItem value={LOAN_APPLICATION_STEPS.OWNER_INFORMATION} />
            <LoanProgramItem
              value={LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION}
            />
          </LoanProgramCollapsible>

          <LoanProgramCollapsible
            label={ARTCAP_MENU.SIGNATURE}
            progressText={`1/1`}
            progressPercent={1}
          >
            <LoanProgramItem value={LOAN_APPLICATION_STEPS.CONFIRMATION} />
          </LoanProgramCollapsible>
        </Accordion>
      </div>
    </div>
  )
}
