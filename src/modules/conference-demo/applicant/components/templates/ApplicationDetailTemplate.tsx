import {
  BusinessInformationForm,
  LoanRequestForm
} from "@/modules/conference-demo/applicant/components/organisms"
import { ReviewApplicationForm } from "@/modules/conference-demo/applicant/components/organisms/ReviewApplicationForm"
import SignAndSubmitForm from "@/modules/conference-demo/applicant/components/organisms/SignAndSubmitForm"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { useProgress } from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import { ComponentType, FC, PropsWithChildren } from "react"
import BusinessPlanForm from "../organisms/BusinessPlanForm"
import CashFlowVerificationForm from "../organisms/CashFlowVerificationForm"

// TODO: 1. CHANGE THE COMPONENT HERE
// TODO: 2. replace ComponentType<PropsWithChildren> with ComponentType when we're done
const ScreenMapper: { [key: string]: ComponentType<PropsWithChildren> } = {
  [STEP.LOAN_REQUEST]: LoanRequestForm,
  [STEP.BUSINESS_INFORMATION]: BusinessInformationForm,
  [STEP.BUSINESS_PLAN]: BusinessPlanForm,
  [STEP.CASH_FLOW_VERIFICATION]: CashFlowVerificationForm,
  [STEP.REVIEW_AND_SUBMIT]: SignAndSubmitForm,
  [STEP.REVIEW_APPLICATION]: ReviewApplicationForm
}

interface Props {}

const ApplicationDetailTemplate: FC<Props> = () => {
  const currentScreen = useProgress.use.currentStep()
  const Component = ScreenMapper[currentScreen]
  // TODO: remove {currentScreen}
  return <Component>{currentScreen}</Component>
}
export default ApplicationDetailTemplate
