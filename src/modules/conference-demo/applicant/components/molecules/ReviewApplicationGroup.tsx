import { ReviewApplicationStep } from "@/modules/conference-demo/applicant/components/atoms"
import { type INPUT_GROUP } from "@/modules/conference-demo/applicant/constants"
import { useProgressSteps } from "@/modules/conference-demo/applicant/stores/useProgress"
import { useMemo } from "react"

interface ReviewApplicationGroupProps {
  parentKey: INPUT_GROUP
}

export function ReviewApplicationGroup({
  parentKey
}: ReviewApplicationGroupProps) {
  const steps = useProgressSteps()

  const reviewAbleStepsByParentKey = useMemo(() => {
    return steps.filter(([, detail]) => detail.group === parentKey)
  }, [parentKey, steps])

  if (!reviewAbleStepsByParentKey.length) return null

  return (
    <div className="flex flex-col gap-y-4xl">
      {reviewAbleStepsByParentKey.map(([step]) => {
        return <ReviewApplicationStep key={step} step={step} />
      })}
    </div>
  )
}
