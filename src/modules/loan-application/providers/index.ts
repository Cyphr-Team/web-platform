import { useContext } from "use-context-selector"
import { LoanApplicationContext } from "./LoanApplicationProvider"
import { PlaidContext } from "./PlaidProvider"
import { LoanProgramDetailContext } from "./LoanProgramDetailProvider"

export const useLoanApplicationContext = () =>
  useContext(LoanApplicationContext)

export const usePlaidContext = () => useContext(PlaidContext)

export const useLoanProgramDetailContext = () =>
  useContext(LoanProgramDetailContext)
