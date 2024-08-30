import { ReviewApplicationStep } from "@/modules/conference-demo/applicant/components/atoms"
import { INPUT_GROUP } from "@/modules/conference-demo/applicant/constants"
import { useProgressSteps } from "@/modules/conference-demo/applicant/stores/useProgress"
import { useMemo } from "react"

interface ReviewApplicationGroupProps {
  parentKey: INPUT_GROUP
  label: string
}
export const ReviewApplicationGroup = ({
  parentKey,
  label
}: ReviewApplicationGroupProps) => {
  const steps = useProgressSteps()

  const reviewAbleStepsByParentKey = useMemo(() => {
    return steps.filter(([, detail]) => detail.group === parentKey)
  }, [parentKey, steps])

  if (!reviewAbleStepsByParentKey.length) return null

  return (
    <div className="col-span-8 grid grid-cols-8 gap-4">
      <div className="col-span-2 text-2xl font-semibold max-w-screen-sm">
        <div>{label}</div>
      </div>
      <div className="col-span-6 flex flex-col gap-6 max-w-screen-sm">
        {reviewAbleStepsByParentKey.map(([step]) => {
          return <ReviewApplicationStep key={step} step={step} />
        })}
      </div>
    </div>
  )
}
