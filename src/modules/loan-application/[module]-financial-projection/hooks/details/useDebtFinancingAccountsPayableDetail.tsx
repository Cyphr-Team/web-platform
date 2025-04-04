import {
  type DebtFinancingFormValue,
  PAYABLE_DAYS_OPTIONS
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing"
import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { type CapitalCollabDebtFinancingFormValue } from "@/modules/loan-application/capital-collab/stores/debt-financing-store"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

interface UseDebtFinancingAccountsPayableDetailProps {
  debtFinancingFormValue?:
    | DebtFinancingFormValue
    | CapitalCollabDebtFinancingFormValue
}

export const useDebtFinancingAccountsPayableDetail = ({
  debtFinancingFormValue
}: UseDebtFinancingAccountsPayableDetailProps) => {
  const daysToGetPaid = debtFinancingFormValue?.payableDays ?? 0

  const debtFinancingAccountsPayableDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.DEBT_FINANCING,
    subId: "accountsPayable",
    title: "Debt Financing: Accounts Payable",
    subTitle:
      "Liabilities represent the financial obligations your business owes, including amounts owed by customers for past credit sales. Understanding how much is owed and the time frame for collection is crucial for managing your cash flow and financial stability",
    financialApplicationFormData: [
      {
        id: "daysToGetPaid",
        title: "Days to get paid: ",
        content: PAYABLE_DAYS_OPTIONS.find(
          (day) => day.value === daysToGetPaid.toString()
        )?.label
      }
    ]
  }

  return { debtFinancingAccountsPayableDetail }
}
