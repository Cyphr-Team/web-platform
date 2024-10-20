import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { type UserMicroLoanApplication } from "@/types/loan-application.type"
import { capitalizeWords, toCurrency } from "@/utils"

interface UseLoanRequestDetailProps {
  loanApplicationDetails?: UserMicroLoanApplication
}

export const useLoanRequestDetail = ({
  loanApplicationDetails
}: UseLoanRequestDetailProps) => {
  const loanRequestDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
    title: "Loan Request",
    financialApplicationFormData: [
      {
        id: "loanAmountRequested",
        title: "Loan amount requested:",
        content: toCurrency(loanApplicationDetails?.loanAmount, 0)
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
