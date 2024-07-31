import {
  LOAN_APPLICATION_STEPS,
  STEP_MENU
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
export const ReviewApplicationGroup = ({
  parentKey,
  label,
  itemsRef
}: IReviewApplicationGroup) => {
  const { progress } = useLoanApplicationProgressContext()

  const progressFilter = useMemo(() => {
    return progress.filter((prog) => prog.parent === parentKey)
  }, [progress, parentKey])

  if (!progressFilter.length) return null

  return (
    <div className="col-span-8 grid grid-cols-8 gap-4">
      <div className="col-span-2 text-2xl font-semibold max-w-screen-sm">
        <div>{label}</div>
      </div>
      <div className="col-span-6 flex flex-col gap-6 max-w-screen-sm">
        {progressFilter.map((prog) => {
          return (
            <ReviewApplicationStep
              ref={(e) => {
                if (itemsRef.current) itemsRef.current[prog.step] = e
              }}
              key={prog.step}
              stepProgress={prog}
            />
          )
        })}
      </div>
    </div>
  )
}
