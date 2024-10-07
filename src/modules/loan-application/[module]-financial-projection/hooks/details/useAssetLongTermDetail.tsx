import { FORMAT_DATE_MM_YYYY } from "@/constants/date.constants"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { USEFUL_LIFE_OPTIONS } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store"
import { AssetsLongTermFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/assets-form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { toCurrency } from "@/utils"
import { formatDate } from "@/utils/date.utils"

interface UseAssetLongTermDetailProps {
  assetsLongTermFormResponse?: AssetsLongTermFormResponse
}
export const useAssetLongTermDetail = ({
  assetsLongTermFormResponse
}: UseAssetLongTermDetailProps) => {
  const assetLongTermDetail = {
    id: LOAN_APPLICATION_STEPS.ASSETS,
    subId: "longTerm",
    title: "Assets: Long Term Assets",
    subTitle:
      "Long-term assets represent significant investments your business has made in resources like equipment, property, and vehicles that are expected to provide value over several years. These assets are crucial for supporting sustained growth and long-term strategic goals.",
    financialApplicationFormData: [],
    subChildren: toAssetDetail(assetsLongTermFormResponse)
  }

  return { assetLongTermDetail }
}

const toAssetDetail = (data: AssetsLongTermFormResponse | undefined) => {
  return data?.forms?.map((asset, index) => (
    <FinancialApplicationFormDetail
      key={`ASSET ${index + 1}`}
      isSubChildren
      financialApplicationFormData={[
        {
          id: "key",
          title: `ASSET ${index + 1}`,
          content: ""
        },
        {
          id: "assetName",
          title: "Name of asset:",
          content: asset?.name
        },
        {
          id: "purchaseDate",
          title: "Purchase date:",
          content: formatDate(asset?.purchaseDate, FORMAT_DATE_MM_YYYY)
        },
        {
          id: "costOfAsset",
          title: "Cost of asset:",
          content: toCurrency(asset?.cost ?? 0, 0)
        },
        {
          id: "usefulLife",
          title: "Useful life of asset:",
          content: asset?.usefulLife
            ? USEFUL_LIFE_OPTIONS.find(
                (useful) => useful.value == asset?.usefulLife
              )?.label
            : "N/A"
        }
      ]}
    />
  ))
}
