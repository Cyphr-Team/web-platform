import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

export const useAssetReceivableDetail = () => {
  const { fpAssetsCurrentFormQuery } = useGetFinancialProjectForms()
  const daysToGetPaid = fpAssetsCurrentFormQuery?.data?.receivableDays

  const assetReceivableDetail = {
    id: LOAN_APPLICATION_STEPS.ASSETS,
    subId: "receivable",
    title: "Assets: Account Receivables",
    subTitle:
      "Accounts Receivable represents the outstanding payments your business is owed from customers. The number of days to get paid helps estimate how long cash is tied up before being available.",
    financialApplicationFormData: [
      {
        id: "DaysToGetPaid: ",
        title: "Days to get paid: ",
        content: daysToGetPaid ? `Net ${daysToGetPaid} days` : "N/A"
      }
    ]
  }

  return { assetReceivableDetail }
}
