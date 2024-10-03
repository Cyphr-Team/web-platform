import { useQueryLoanReadinessAssessmentByApplicationId } from "@/modules/conference-demo/admin/hooks/conference/useQuery"
import { FinancialApplicationAssessment } from "@/modules/loan-application-management/pages/cyphr-flex/FinancialApplicationAssessment"
import { FinancialApplicationCriteria } from "@/modules/loan-application-management/pages/cyphr-flex/FinancialApplicationCriteria"

export function Component() {
  return <LoanReadiness />
}

export const LoanReadiness = () => {
  const { data, isLoading } = useQueryLoanReadinessAssessmentByApplicationId()

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
