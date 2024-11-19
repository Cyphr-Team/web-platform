import { LoanReadyProgramDetail } from "@/modules/loan-application/pages/LoanProgramDetail/Custom/LoanReadyProgramDetail"
import { LoanProgramDetail } from "@/modules/loan-application/pages/LoanProgramDetail/LoanProgramDetail"
import { LoanProgramDetailProvider } from "@/modules/loan-application/providers/LoanProgramDetailProvider"
import LoanReadyV2ProgramDetail from "@/modules/loanready/components/layouts/LoanReadyV2ProgramDetail"
import { isLoanReady } from "@/utils/domain.utils"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils"

export function Component() {
  if (isLoanReady()) {
    const LoanReadyProgramDetailComponent = isEnableLoanReadyV2()
      ? LoanReadyV2ProgramDetail
      : LoanReadyProgramDetail

    return (
      <LoanProgramDetailProvider>
        <LoanReadyProgramDetailComponent />
      </LoanProgramDetailProvider>
    )
  }

  return (
    <LoanProgramDetailProvider>
      <LoanProgramDetail />
    </LoanProgramDetailProvider>
  )
}

Component.displayName = "LoanProgramDetail"
