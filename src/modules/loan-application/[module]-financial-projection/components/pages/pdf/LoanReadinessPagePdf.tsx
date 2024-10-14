import { useQueryLoanReadinessAssessmentByApplicationId } from "@/modules/loan-application-management/hooks/loan-readiness-assessment/useQueryLoanReadinessAssessment"
import { useParams } from "react-router-dom"
import { FinancialApplicationCriteria } from "@/modules/loan-application-management/pages/cyphr-flex/FinancialApplicationCriteria.tsx"
import { snakeCaseToText } from "@/utils"
import { CRITERIA_NOT_AVAILABLE } from "@/modules/loan-application-management/services/loan-readiness.service.ts"
import { get } from "lodash"

export const LoanReadinessPagePdf = () => {
  const { id } = useParams()
  const { data } = useQueryLoanReadinessAssessmentByApplicationId({
    applicationId: id
  })

  const category = get(data, "applicationScore.category")

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-medium">Loan Ready</h1>
      <div className="flex gap-2xl">
        <div className="flex flex-col gap-4 min-w-[240px]">
          <div className="flex flex-col gap-4 font-semibold uppercase">
            YOUR SCORE
          </div>
          <div className="text-7xl font-normal">
            {get(data, "applicationScore.score", 0)}%
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-semibold uppercase">
            {category
              ? snakeCaseToText(category.toLowerCase())
              : CRITERIA_NOT_AVAILABLE}
          </div>
          <div className="text-sm">
            {get(data, "applicationScore.actionPlan")}
          </div>
        </div>
      </div>

      <FinancialApplicationCriteria
        criteria={data?.criteria}
        isLoading={false}
      />
    </div>
  )
}
