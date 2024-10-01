import { DebtFinancingField } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

export const useDebtFinancingAccountsPayableDetail = () => {
  const { debtFinancingLiabilityFormQuery } = useGetFinancialProjectForms()
  const daysToGetPaid =
    debtFinancingLiabilityFormQuery?.data?.[DebtFinancingField.PAYABLE_DAYS]

  const debtFinancingAccountsPayableDetail = {
    id: LOAN_APPLICATION_STEPS.DEBT_FINANCING,
    subId: "accountsPayable",
    title: "Debt Financing: Accounts Payable",
    subTitle:
      "Liabilities represent the financial obligations your business owes, including amounts owed by customers for past credit sales. Understanding how much is owed and the time frame for collection is crucial for managing your cash flow and financial stability",
    financialApplicationFormData: [
      {
        id: "daysToGetPaid",
        title: "Days to get paid: ",
        content: daysToGetPaid ? `Net ${daysToGetPaid} days` : "N/A"
      }
    ]
  }

  return { debtFinancingAccountsPayableDetail }
}
