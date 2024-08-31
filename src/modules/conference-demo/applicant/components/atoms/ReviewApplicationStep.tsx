import {
  ArticlesOfOrganizationForm,
  BusinessEINLetterForm,
  BusinessInformationForm,
  ByLawsForm,
  CertificateOfGoodStandingForm,
  FictitiousNameCertificationForm,
  LoanRequestForm
} from "@/modules/conference-demo/applicant/components/organisms"
import BusinessPlanForm from "@/modules/conference-demo/applicant/components/organisms/BusinessPlanForm"
import CashFlowVerificationForm from "@/modules/conference-demo/applicant/components/organisms/CashFlowVerificationForm"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { ComponentType, memo, PropsWithChildren } from "react"

interface ReviewApplicationStepProps {
  step: string
}
const ReviewApplicationStep = ({ step }: ReviewApplicationStepProps) => {
  const Component = ReviewScreenMapper[step]

  /**
   * Some forms (e.g., PreQualification) are not required to be included in the review application step.
   */
  if (!Component) return null

  return (
    <div className="w-full h-full">
      <Component />
    </div>
  )
}

export default memo(ReviewApplicationStep)

const ReviewScreenMapper: { [key: string]: ComponentType<PropsWithChildren> } =
  {
    [STEP.LOAN_REQUEST]: LoanRequestForm,
    [STEP.BUSINESS_INFORMATION]: BusinessInformationForm,
    [STEP.BUSINESS_PLAN]: BusinessPlanForm,
    [STEP.CASH_FLOW_VERIFICATION]: CashFlowVerificationForm,
    //
    [STEP.ARTICLES_OF_ORGANIZATION]: ArticlesOfOrganizationForm,
    [STEP.BUSINESS_EIN_LETTER]: BusinessEINLetterForm,
    [STEP.CERTIFICATE_OF_GOOD_STANDING]: CertificateOfGoodStandingForm,
    [STEP.FICTITIOUS_NAME_CERTIFICATION]: FictitiousNameCertificationForm,
    [STEP.BY_LAWS]: ByLawsForm
  }
