import { ComponentType, FC, PropsWithChildren } from "react"
import { useProgress } from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import { SCREEN } from "@/modules/conference-demo/applicant/constants"
import { LoanRequestForm } from "@/modules/conference-demo/applicant/components/organisms"

// TODO: remove this
const KhoaiMon = ({ children }: PropsWithChildren) => {
  return <div>Khoai Mon with {children}</div>
}

// TODO: 1. CHANGE THE COMPONENT HERE
// TODO: 2. replace ComponentType<PropsWithChildren> with ComponentType when we're done
const ScreenMapper: { [key: string]: ComponentType<PropsWithChildren> } = {
  [SCREEN.LOAN_REQUEST]: LoanRequestForm,
  [SCREEN.BUSINESS_INFORMATION]: KhoaiMon, // TODO: remove this
  [SCREEN.BUSINESS_PLAN]: KhoaiMon, // TODO: remove this
  [SCREEN.CASH_FLOW_VERIFICATION]: KhoaiMon, // TODO: remove this
  [SCREEN.REVIEW_AND_SUBMIT]: KhoaiMon, // TODO: remove this
  [SCREEN.REVIEW_APPLICATION]: KhoaiMon // TODO: remove this
}

interface Props {}

const ApplicationDetailTemplate: FC<Props> = () => {
  const currentScreen = useProgress.use.currentScreen()
  const Component = ScreenMapper[currentScreen]
  // TODO: remove {currentScreen}
  return <Component>{currentScreen}</Component>
}
export default ApplicationDetailTemplate
