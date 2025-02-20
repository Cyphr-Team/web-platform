import { useQueryLoanReadinessAssessmentByApplicationId } from "@/modules/loan-application-management/hooks/loan-readiness-assessment/useQueryLoanReadinessAssessment"
import { FinancialApplicationAssessment } from "@/modules/loan-application-management/pages/cyphr-flex/FinancialApplicationAssessment"
import { FinancialApplicationCriteria } from "@/modules/loan-application-management/pages/cyphr-flex/FinancialApplicationCriteria"
import { Drawer } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer"
import { useParams } from "react-router-dom"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog.tsx"
import useBoolean from "../../../../../hooks/useBoolean.ts"
import { criteriaNameMapping } from "@/modules/loan-application/constants/type.ts"
import { useMemo } from "react"

export function Component() {
  return (
    <div className="flex flex-col gap-8">
      <div className="ml-auto">
        <Drawer />
      </div>

      <LoanReadiness />
    </div>
  )
}

export default function LoanReadiness() {
  const { id } = useParams()
  const { data, isLoading } = useQueryLoanReadinessAssessmentByApplicationId({
    applicationId: id
  })
  const isLoanReadinessCalculationIncomplete = useMemo(() => {
    return (
      !data?.criteria ||
      Object.keys(data?.criteria).length !==
        Object.keys(criteriaNameMapping).length
    )
  }, [data?.criteria])
  const isOpen = useBoolean(true)

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
      {isLoanReadinessCalculationIncomplete ? (
        <CustomAlertDialog
          description={
            <span className="break-keep text-md text-[#252828]">
              Your <b>LoanReady</b> score is almost ready. Please check back in
              2 minutes.
            </span>
          }
          header={<div className="loanready-loader m-6" />}
          isOpen={isOpen.value}
          title="Loading..."
        />
      ) : null}
    </div>
  )
}
