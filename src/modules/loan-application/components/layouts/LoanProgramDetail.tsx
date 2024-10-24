import { LoanReadyProgramDetail } from "@/modules/loan-application/pages/LoanProgramDetail/Custom/LoanReadyProgramDetail"
import { LoanProgramDetail } from "@/modules/loan-application/pages/LoanProgramDetail/LoanProgramDetail"
import { LoanProgramDetailProvider } from "@/modules/loan-application/providers/LoanProgramDetailProvider"
import { isLoanReady } from "@/utils/domain.utils"

export function Component() {
  if (isLoanReady()) {
    return (
      <LoanProgramDetailProvider>
        <LoanReadyProgramDetail />
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
