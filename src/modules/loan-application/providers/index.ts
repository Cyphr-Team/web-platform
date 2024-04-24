import { useContext } from "use-context-selector"
import { LoanApplicationContext } from "./LoanApplicationProvider"
import { PlaidContext } from "./PlaidProvider"
import { MicroLoanProgramDetailContext } from "./LoanProgramDetailProvider"
import { LoanApplicationFormContext } from "./LoanApplicationFormProvider"
import { LoanProgressContext } from "./LoanProgressProvider"
import { LoanType } from "@/types/loan-program.type"
import { MicroLoanBRLoanApplicationDetailsContext } from "./BRLoanApplicationDetailsProvider"

export const useLoanApplicationContext = () =>
  useContext(LoanApplicationContext)

export const usePlaidContext = () => useContext(PlaidContext)

export const useLoanProgramDetailContext = (type?: LoanType) => {
  const microLoanProgramDetailContext = useContext(
    MicroLoanProgramDetailContext
  )
  switch (type) {
    case LoanType.MICRO:
      return microLoanProgramDetailContext
    default:
      return microLoanProgramDetailContext
  }
}

export const useLoanApplicationFormContext = () =>
  useContext(LoanApplicationFormContext)

export const useLoanApplicationProgressContext = () =>
  useContext(LoanProgressContext)

export const useBRLoanApplicationDetailsContext = (type?: LoanType) => {
  const microLoanBrLoanApplicationDetailsContext = useContext(
    MicroLoanBRLoanApplicationDetailsContext
  )
  switch (type) {
    case LoanType.MICRO:
      return microLoanBrLoanApplicationDetailsContext
    default:
      return microLoanBrLoanApplicationDetailsContext
  }
}
