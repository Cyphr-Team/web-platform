import { Separator } from "@/components/ui/separator"
import { InformationRow } from "../../molecules/InformationRow"

export const CashFlowSummary = () => {
  return (
    <>
      <InformationRow
        label="Business Tax Returns (2020, 2021, 2022)"
        isBadge
        badgeText="FAILED"
      />
      <Separator />
      <InformationRow
        label="Bank Statements (Oct 2023 + Nov 2023)"
        isBadge
        badgeText="FAILED"
      />
      <Separator />
      <InformationRow
        label="List of Outstanding Business Debts"
        isBadge
        badgeText="FAILED"
      />
    </>
  )
}
