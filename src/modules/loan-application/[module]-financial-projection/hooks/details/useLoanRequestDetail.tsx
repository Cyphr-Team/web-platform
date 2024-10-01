import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
import { capitalizeWords, toCurrency } from "@/utils"

export const useLoanRequestDetail = () => {
  const { loanApplicationDetails } = useBRLoanApplicationDetailsContext()
  const loanRequestDetail = {
    id: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
    title: "Loan Request",
    financialApplicationFormData: [
      {
        id: "loanAmountRequested",
        title: "Loan amount requested:",
        content: toCurrency(loanApplicationDetails?.loanAmount ?? 0, 0)
      },
      {
        id: "proposedUseOfLoan",
        title: "Proposed use of loan:",
        content: capitalizeWords(
          loanApplicationDetails?.proposeUseOfLoan.replace(/_/g, " ") ?? "N/A"
        )
      }
    ]
  }
  return { loanRequestDetail }
}
