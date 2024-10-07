import { RECEIVABLE_DAYS_OPTIONS } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store"
import { FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { AssetsCurrentFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/assets-form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

interface UseAssetReceivableDetailProps {
  assetsCurrentFormResponse?: AssetsCurrentFormResponse
}
export const useAssetReceivableDetail = ({
  assetsCurrentFormResponse
}: UseAssetReceivableDetailProps) => {
  const daysToGetPaid = assetsCurrentFormResponse?.receivableDays ?? 0

  const assetReceivableDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.ASSETS,
    subId: "receivable",
    title: "Assets: Account Receivables",
    subTitle:
      "Accounts Receivable represents the outstanding payments your business is owed from customers. The number of days to get paid helps estimate how long cash is tied up before being available.",
    financialApplicationFormData: [
      {
        id: "DaysToGetPaid: ",
        title: "Days to get paid: ",
        content: RECEIVABLE_DAYS_OPTIONS.find(
          (day) => day.value === daysToGetPaid.toString()
        )?.label
      }
    ]
  }

  return { assetReceivableDetail }
}
