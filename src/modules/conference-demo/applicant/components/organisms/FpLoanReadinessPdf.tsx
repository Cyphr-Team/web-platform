import { FinancialApplicationCriteria } from "@/modules/loan-application-management/pages/cyphr-flex/FinancialApplicationCriteria.tsx"
import { snakeCaseToText } from "@/utils"
import { CRITERIA_NOT_AVAILABLE } from "@/modules/loan-application-management/services/loan-readiness.service.ts"
import { get } from "lodash"
import { useQueryLoanReadinessAssessmentByApplicationId } from "@/modules/conference-demo/admin/hooks/conference/useQuery"

export function FpLoanReadinessPdf() {
  const { data } = useQueryLoanReadinessAssessmentByApplicationId()

  const category = get(data, "applicationScore.category")

  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="text-3xl font-medium">LoanReady</h1>
      <div className="flex gap-2xl">
        <div className="flex min-w-[450px] flex-col gap-4">
          <div className="flex flex-col gap-4 text-2xl font-medium uppercase">
            YOUR SCORE
          </div>
          <div className="text-9xl">
            {Math.round(get(data, "applicationScore.score", 0))}%
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-2xl font-medium uppercase">
            {category
              ? snakeCaseToText(category.toLowerCase())
              : CRITERIA_NOT_AVAILABLE}
          </div>
          <div className="text-sm leading-6">
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
