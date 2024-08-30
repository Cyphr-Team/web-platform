import {
  BusinessInformationForm,
  LoanRequestForm
} from "@/modules/conference-demo/applicant/components/organisms"
import BusinessPlanForm from "@/modules/conference-demo/applicant/components/organisms/BusinessPlanForm"
import CashFlowVerificationForm from "@/modules/conference-demo/applicant/components/organisms/CashFlowVerificationForm"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { forwardRef, memo, useMemo } from "react"

interface ReviewApplicationStepProps {
  step: string
}
const ReviewApplicationStep = forwardRef<
  HTMLDivElement,
  ReviewApplicationStepProps
>(({ step }: ReviewApplicationStepProps) => {
  const componentByStep = useGetReviewFormByStep(step)

  /**
   * Some forms (e.g., PreQualification) are not required to be included in the review application step.
   */
  if (!componentByStep) return null

  return <div className="w-full h-full">{componentByStep}</div>
})

export default memo(ReviewApplicationStep)

/**
 * Use a custom hook to prevent fast refresh on save, make development mode smoother
 * This hook doesn't include the review component, so it won't make an infinity loop
 */
const useGetReviewFormByStep = (step: string) => {
  return useMemo(() => {
    switch (step) {
      case STEP.LOAN_REQUEST:
        return <LoanRequestForm />
      case STEP.BUSINESS_INFORMATION:
        return <BusinessInformationForm />
      case STEP.BUSINESS_PLAN:
        return <BusinessPlanForm />
      case STEP.CASH_FLOW_VERIFICATION:
        return <CashFlowVerificationForm />
      default:
        return null
    }
  }, [step])
}
