import DocumentReviewOnly from "@/modules/conference-demo/applicant/components/molecules/DocumentReviewOnly"
import {
  BusinessInformationForm,
  LoanRequestForm
} from "@/modules/conference-demo/applicant/components/organisms"
import BusinessPlanForm from "@/modules/conference-demo/applicant/components/organisms/BusinessPlanForm"
import CashFlowVerificationForm from "@/modules/conference-demo/applicant/components/organisms/CashFlowVerificationForm"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { type ComponentType, memo } from "react"

interface ReviewApplicationFormProps {
  step: string
}

function ReviewApplicationStep({ step }: ReviewApplicationFormProps) {
  const Component = ReviewScreenMapper[step]

  /**
   * Some forms (e.g., PreQualification) are not required to be included in the review application step.
   */
  if (!Component) return null

  return (
    <Component wrapperClassName="md:col-start-0 max-w-screen-lg md:col-span-8 md:mx-0" />
  )
}

export default memo(ReviewApplicationStep)

const ReviewScreenMapper: Record<
  string,
  ComponentType<{ wrapperClassName?: string }>
> = {
  [STEP.LOAN_REQUEST]: LoanRequestForm,
  [STEP.BUSINESS_INFORMATION]: BusinessInformationForm,
  [STEP.BUSINESS_PLAN]: BusinessPlanForm,
  [STEP.CASH_FLOW_VERIFICATION]: CashFlowVerificationForm,
  //
  // Exceptional requirement, only show the uploaded document
  [STEP.ARTICLES_OF_ORGANIZATION]: DocumentReviewOnly
}
