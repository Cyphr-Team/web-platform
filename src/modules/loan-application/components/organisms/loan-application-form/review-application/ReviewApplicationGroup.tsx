import {
  type LOAN_APPLICATION_STEPS,
  type STEP_MENU
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { useMemo } from "react"
import { ReviewApplicationStep } from "./ReviewApplicationStep"

interface IReviewApplicationGroup {
  parentKey: STEP_MENU
  label: string
  itemsRef: React.MutableRefObject<
    Partial<Record<LOAN_APPLICATION_STEPS, HTMLDivElement | null>>
  >
}

/**
 * 'LOAN_APPLICATION_STEPS' Steps that group by its parent (STEP_MENU)
 * @see LOAN_APPLICATION_STEPS
 * @see STEP_MENU
 */
export function ReviewApplicationGroup({
  parentKey,
  label,
  itemsRef
}: IReviewApplicationGroup) {
  const { progress } = useLoanApplicationProgressContext()

  const progressFilter = useMemo(() => {
    return progress.filter((prog) => prog.parent === parentKey)
  }, [progress, parentKey])

  if (!progressFilter.length) return null

  return (
    <div className="col-span-8 grid grid-cols-8 gap-4">
      <div className="col-span-2 max-w-screen-sm text-2xl font-semibold">
        <div>{label}</div>
      </div>
      <div className="col-span-6 flex max-w-screen-sm flex-col gap-6">
        {progressFilter.map((prog) => {
          return (
            <ReviewApplicationStep
              key={prog.step}
              ref={(e) => {
                if (itemsRef.current) itemsRef.current[prog.step] = e
              }}
              stepProgress={prog}
            />
          )
        })}
      </div>
    </div>
  )
}
