import { useContext } from "use-context-selector"
import { LoanApplicationContext } from "./LoanApplicationProvider"
import { PlaidContext } from "./PlaidProvider"
import { LoanProgramDetailContext } from "./LoanProgramDetailProvider"
import { LoanApplicationFormContext } from "./LoanApplicationFormProvider"
import { LoanProgressContext } from "./LoanProgressProvider"

export const useLoanApplicationContext = () =>
  useContext(LoanApplicationContext)

export const usePlaidContext = () => useContext(PlaidContext)

export const useLoanProgramDetailContext = () =>
  useContext(LoanProgramDetailContext)

export const useLoanApplicationFormContext = () =>
  useContext(LoanApplicationFormContext)

export const useLoanApplicationProgressContext = () =>
  useContext(LoanProgressContext)
