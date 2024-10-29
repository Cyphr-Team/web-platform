import {
  type AssetsFormValue,
  RECEIVABLE_DAYS_OPTIONS
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store"
import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

interface UseAssetReceivableDetailProps {
  assetsFormValue?: AssetsFormValue
}

export const useAssetReceivableDetail = ({
  assetsFormValue
}: UseAssetReceivableDetailProps) => {
  const daysToGetPaid = assetsFormValue?.receivableDays ?? 0

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
