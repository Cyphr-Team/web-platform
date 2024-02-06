import { InformationRow } from "../../molecules/InformationRow"
import { Separator } from "@/components/ui/separator"

export const CollateralDocumentationSummary = () => {
  return (
    <>
      <InformationRow label="Inventory Valuations" isBadge badgeText="FAILED" />
      <Separator />
      <InformationRow
        label="Vehicle Registration Certificate"
        isBadge
        badgeText="FAILED"
      />
      <Separator />
      <InformationRow
        label="Business Lease Agreement"
        isBadge
        badgeText="FAILED"
      />
      <Separator />
      <InformationRow label="Purchase Orders" isBadge badgeText="FAILED" />
      <Separator />
      <InformationRow
        label="Real Estate Property Deed"
        isBadge
        badgeText="FAILED"
      />
    </>
  )
}
