import { ChatSupportButton } from "@/modules/chat-support/components/ChatSupportButton"
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
import { type ComponentType } from "react"

const ScreenMapper: Record<string, ComponentType> = {
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

function ApplicationDetailTemplate() {
  const currentScreen = useProgress.use.currentStep()
  const Component = ScreenMapper[currentScreen]

  return (
    <>
      <Component />
      <ChatSupportButton />
    </>
  )
}

export default ApplicationDetailTemplate
