import { Separator } from "@/components/ui/separator"
import { InformationRow } from "../../molecules/InformationRow"

export const FinancialStatementsSummary = () => {
  return (
    <>
      <InformationRow
        label="Balance Sheet - Historical (2017 - 2022)"
        isBadge
        badgeText="FAILED"
      />
      <Separator />
      <InformationRow
        label="Income Statement - Historical (2017 - 2022)"
        isBadge
        badgeText="FAILED"
      />
      <Separator />
      <InformationRow
        label="Statement of Cash Flow - Historical (2017 - 2022)"
        isBadge
        badgeText="FAILED"
      />
      <Separator />
      <InformationRow
        label="Balance Sheet - Projected (2023 - 2027)"
        isBadge
        badgeText="FAILED"
      />
      <Separator />
      <InformationRow
        label="Income Statement - Projected (2023 - 2027)"
        isBadge
        badgeText="FAILED"
      />
      <Separator />
      <InformationRow
        label="Statement of Cash Flow - Projected (2023 - 2027)"
        isBadge
        badgeText="FAILED"
      />
    </>
  )
}
