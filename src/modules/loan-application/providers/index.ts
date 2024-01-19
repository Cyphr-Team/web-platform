import { useContext } from "use-context-selector"
import { LoanApplicationContext } from "./LoanApplicationProvider"
import { PlaidContext } from "./PlaidProvider"

export const useLoanApplicationContext = () =>
  useContext(LoanApplicationContext)

export const usePlaidContext = () => useContext(PlaidContext)
