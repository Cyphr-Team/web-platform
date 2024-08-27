import { useParams } from "react-router-dom"
import { useQueryLoanReadinessAssessmentByApplicationId } from "../../hooks/loan-readiness-assessment/useQueryLoanReadinessAssessment"
import { ApplicationAssessment } from "./ApplicationAssessment"
import { ApplicationCriteria } from "./ApplicationCriteria"
import { useLoanReadinessStore } from "./store/useLoanReadinessStore"

export const Component = () => {
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
        score={data?.applicationScore?.score}
        ratingLevel={data?.applicationScore?.ratingLevel}
        isLoading={isLoading}
      />

      <ApplicationCriteria
        criteria={data?.criteria}
        isLoading={isLoading}
        handleRefetch={handleRefetch}
      />
    </div>
  )
}

Component.displayName = "Loan Readiness"
