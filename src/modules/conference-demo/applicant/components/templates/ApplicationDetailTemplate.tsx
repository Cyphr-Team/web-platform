import {
  ArticlesOfOrganizationForm,
  BankStatementForm,
  BusinessInformationForm,
  BusinessPlanForm,
  CashFlowVerificationForm,
  LoanRequestForm,
  ReviewApplicationForm
} from "@/modules/conference-demo/applicant/components/organisms"
import SignAndSubmitForm from "@/modules/conference-demo/applicant/components/organisms/SignAndSubmitForm"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { useProgress } from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import { ComponentType, FC } from "react"

const ScreenMapper: { [key: string]: ComponentType } = {
  [STEP.LOAN_REQUEST]: LoanRequestForm,
  [STEP.BUSINESS_INFORMATION]: BusinessInformationForm,
  [STEP.BUSINESS_PLAN]: BusinessPlanForm,
  [STEP.CASH_FLOW_VERIFICATION]: CashFlowVerificationForm,
  //
  [STEP.ARTICLES_OF_ORGANIZATION]: ArticlesOfOrganizationForm,
  [STEP.BANK_STATEMENTS]: BankStatementForm,
  //
  [STEP.REVIEW_AND_SUBMIT]: SignAndSubmitForm,
  [STEP.REVIEW_APPLICATION]: ReviewApplicationForm
}

interface Props {}

const ApplicationDetailTemplate: FC<Props> = () => {
  const currentScreen = useProgress.use.currentStep()
  const Component = ScreenMapper[currentScreen]
  return <Component />
}
export default ApplicationDetailTemplate
