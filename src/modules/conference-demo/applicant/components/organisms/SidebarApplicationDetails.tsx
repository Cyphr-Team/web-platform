import { cn } from "@/lib/utils"
import { LogoHeader } from "@/shared/atoms/LogoHeader"
import { useProgressSteps } from "../../stores/useProgress"
import { Accordion } from "@/components/ui/accordion"
import groupBy from "lodash.groupby"
import { useMemo } from "react"
import { type STEP } from "../../constants"
import LoanProgramCollapsible from "../molecules/LoanProgramCollapsible"
import LoanProgramItem from "../molecules/LoanProgramItem"

export function SidebarApplicationDetails() {
  const progresses = useProgressSteps()

  const groups = useMemo(() => {
    return groupBy(
      progresses.map(([step, stepDetail]) => ({
        key: step as STEP,
        detail: stepDetail
      })),
      (step) => {
        return step.detail.group
      }
    )
  }, [progresses])

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
          key={progresses.length}
          className="flex w-full flex-col gap-2"
          defaultValue={Object.keys(groups)}
          type="multiple"
        >
          {Object.keys(groups).map((parentMenu) => (
            <LoanProgramCollapsible
              key={parentMenu}
              label={parentMenu}
              progress={groups[parentMenu].length.toString()}
            >
              {groups[parentMenu].map((step) => (
                <LoanProgramItem key={step.key} value={step.key} />
              ))}
            </LoanProgramCollapsible>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
