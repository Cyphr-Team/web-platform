import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { InformationRow } from "../../molecules/InformationRow"
import { Separator } from "@/components/ui/separator"

export const CollateralDocumentationSummary = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const collateral = loanSummary?.collateralDocumentation

  return (
    <>
      <InformationRow
        label="Inventory Valuations"
        isBadge
        badgeText={collateral?.inventoryValuations}
      />
      <Separator />
      <InformationRow
        label="Vehicle Registration Certificate"
        isBadge
        badgeText={collateral?.vehicleRegistrationCertificate}
      />
      <Separator />
      <InformationRow
        label="Business Lease Agreement"
        isBadge
        badgeText={collateral?.businessLeaseAgreement}
      />
      <Separator />
      <InformationRow
        label="Purchase Orders"
        isBadge
        badgeText={collateral?.purchaseOrders}
      />
      <Separator />
      <InformationRow
        label="Real Estate Property Deed"
        isBadge
        badgeText={collateral?.realEstatePropertyDeed}
      />
    </>
  )
}
