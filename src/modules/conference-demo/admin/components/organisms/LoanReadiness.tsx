import { useQueryLoanReadinessAssessmentByApplicationId } from "@/modules/conference-demo/admin/hooks/conference/useQuery"
import { ApplicationAssessment } from "@/modules/loan-application-management/pages/cyphr-flex/ApplicationAssessment"
import { ApplicationCriteria } from "@/modules/loan-application-management/pages/cyphr-flex/ApplicationCriteria"

export function LoanReadiness() {
  const { data, isLoading } = useQueryLoanReadinessAssessmentByApplicationId()

  return (
    <div className="flex flex-col gap-8">
      <ApplicationAssessment
        actionPlan={data?.applicationScore?.actionPlan}
        category={data?.applicationScore?.category}
        isLoading={isLoading}
        ratingLevel={data?.applicationScore?.ratingLevel}
        score={data?.applicationScore?.score}
      />

      <ApplicationCriteria criteria={data?.criteria} isLoading={isLoading} />
    </div>
  )
}
