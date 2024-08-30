import { useQueryLoanReadinessAssessmentByApplicationId } from "@/modules/conference-demo/admin/hooks/conference/useQuery"
import { ApplicationAssessment } from "@/modules/loan-application-management/pages/cyphr-flex/ApplicationAssessment"
import { ApplicationCriteria } from "@/modules/loan-application-management/pages/cyphr-flex/ApplicationCriteria"

export const LoanReadiness = () => {
  const { data, isLoading } = useQueryLoanReadinessAssessmentByApplicationId()

  return (
    <div className="flex flex-col gap-8">
      <ApplicationAssessment
        actionPlan={data?.applicationScore?.actionPlan}
        category={data?.applicationScore?.category}
        score={data?.applicationScore?.score}
        ratingLevel={data?.applicationScore?.ratingLevel}
        isLoading={isLoading}
      />

      <ApplicationCriteria criteria={data?.criteria} isLoading={isLoading} />
    </div>
  )
}
