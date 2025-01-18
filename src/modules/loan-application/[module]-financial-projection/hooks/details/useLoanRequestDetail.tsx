import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  type ILoanRequestFormValue,
  type LoanRequestFormValue
} from "@/modules/loan-application/constants/form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { getUseOfLoan } from "@/modules/loan-application-management/services"
import { type UseOfLoan } from "@/types/loan-application.type.ts"
import { toCurrency } from "@/utils"
import { isCapitalCollab } from "@/utils/domain.utils"
import useGetLoanProgram from "@/modules/loan-application/hooks/program/useGetLoanProgram"

interface UseLoanRequestDetailProps {
  loanRequestFormValue?: LoanRequestFormValue | ILoanRequestFormValue
}

export const useLoanRequestDetail = ({
  loanRequestFormValue
}: UseLoanRequestDetailProps) => {
  const { loanProgram } = useGetLoanProgram()
  const isAllowMoreThanMaxLoanAmount =
    isCapitalCollab() &&
    loanRequestFormValue?.loanAmount === loanProgram?.maxLoanAmount
  const loanRequestDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
    title: "Loan Request",
    financialApplicationFormData: [
      {
        id: "loanAmountRequested",
        title: "Loan amount requested:",
        content:
          toCurrency(loanRequestFormValue?.loanAmount, 0) +
          (isAllowMoreThanMaxLoanAmount ? "+" : "")
      },
      {
        id: "proposedUseOfLoan",
        title: "Proposed use of loan:",
        content: getUseOfLoan(
          loanRequestFormValue?.proposeUseOfLoan as UseOfLoan
        )
      }
    ]
  }

  return { loanRequestDetail }
}
