import { useContext } from "use-context-selector"
import { LoanApplicationContext } from "./LoanApplicationProvider"

export const useLoanApplicationContext = () =>
  useContext(LoanApplicationContext)
