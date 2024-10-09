import { useQueryLoanReadinessAssessmentByApplicationId } from "@/modules/loan-application-management/hooks/loan-readiness-assessment/useQueryLoanReadinessAssessment"
import { FinancialApplicationAssessment } from "@/modules/loan-application-management/pages/cyphr-flex/FinancialApplicationAssessment"
import { FinancialApplicationCriteria } from "@/modules/loan-application-management/pages/cyphr-flex/FinancialApplicationCriteria"
import { useParams } from "react-router-dom"

export function Component() {
  return <LoanReadiness />
}

export const LoanReadiness = () => {
  const { id } = useParams()
  const { data, isLoading } = useQueryLoanReadinessAssessmentByApplicationId({
    applicationId: id
  })

  return (
    <div className="flex flex-col gap-8">
      <FinancialApplicationAssessment
        {...(data?.applicationScore ?? {})}
        isLoading={isLoading}
      />

      <FinancialApplicationCriteria
        criteria={data?.criteria}
        isLoading={isLoading}
      />
    </div>
  )
}
