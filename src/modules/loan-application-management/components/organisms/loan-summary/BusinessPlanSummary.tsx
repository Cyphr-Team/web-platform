import { Separator } from "@/components/ui/separator"
import { InformationRow } from "../../molecules/InformationRow"

export const BusinessPlanSummary = () => {
  return (
    <>
      <InformationRow label="Executive Summary" isBadge badgeText="FAILED" />
      <Separator />
      <InformationRow label="3-year Business Plan" isBadge badgeText="FAILED" />
      <Separator />
      <InformationRow label="5-year Business Plan" isBadge badgeText="FAILED" />
    </>
  )
}
