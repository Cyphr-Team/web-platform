import { Separator } from "@/components/ui/separator"
import { InformationRow } from "../../molecules/InformationRow"

export const SBAFormsSummary = () => {
  return (
    <>
      <InformationRow
        label="SBA Form 1919 (Borrower Information Form)"
        isBadge
        badgeText="FAILED"
      />
      <Separator />
      <InformationRow
        label="SBA Form 912 (Statement of Personal History)"
        isBadge
        badgeText="FAILED"
      />
      <Separator />
      <InformationRow
        label="SBA Form 413 (Personal Financial Statement)"
        isBadge
        badgeText="FAILED"
      />
    </>
  )
}
