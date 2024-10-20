import { useParams } from "react-router-dom"
import { useQueryLoanReadinessAssessmentByApplicationId } from "../../hooks/loan-readiness-assessment/useQueryLoanReadinessAssessment"
import { ApplicationAssessment } from "./ApplicationAssessment"
import { ApplicationCriteria } from "./ApplicationCriteria"
import { useLoanReadinessStore } from "./store/useLoanReadinessStore"

export function Component() {
  const { id: applicationId } = useParams()
  const dummyLevel = useLoanReadinessStore.use.dummyLevel()
  const { setDummyLevel } = useLoanReadinessStore.use.action()

  const { data, isLoading, refetch } =
    useQueryLoanReadinessAssessmentByApplicationId({
      applicationId: applicationId,
      params: { dummyLevel }
    })

  const handleRefetch = () => {
    setDummyLevel(undefined)
    refetch()
  }

  return (
    <div className="flex flex-col gap-4">
      <ApplicationAssessment
        actionPlan={data?.applicationScore?.actionPlan}
        category={data?.applicationScore?.category}
        isLoading={isLoading}
        ratingLevel={data?.applicationScore?.ratingLevel}
        score={data?.applicationScore?.score}
      />

      <ApplicationCriteria
        criteria={data?.criteria}
        handleRefetch={handleRefetch}
        isLoading={isLoading}
      />
    </div>
  )
}

Component.displayName = "Loan Readiness"
