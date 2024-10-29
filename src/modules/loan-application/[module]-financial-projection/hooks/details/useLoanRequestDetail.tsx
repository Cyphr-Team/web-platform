import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { type LoanRequestFormValue } from "@/modules/loan-application/constants/form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, toCurrency } from "@/utils"

interface UseLoanRequestDetailProps {
  loanRequestFormValue?: LoanRequestFormValue
}

export const useLoanRequestDetail = ({
  loanRequestFormValue
}: UseLoanRequestDetailProps) => {
  const loanRequestDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
    title: "Loan Request",
    financialApplicationFormData: [
      {
        id: "loanAmountRequested",
        title: "Loan amount requested:",
        content: toCurrency(loanRequestFormValue?.loanAmount, 0)
      },
      {
        id: "proposedUseOfLoan",
        title: "Proposed use of loan:",
        content: capitalizeWords(
          loanRequestFormValue?.proposeUseOfLoan.replace(/_/g, " ") ?? "N/A"
        )
      }
    ]
  }

  return { loanRequestDetail }
}
