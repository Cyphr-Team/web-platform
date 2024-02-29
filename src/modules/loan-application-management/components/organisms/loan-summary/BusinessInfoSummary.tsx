import { Separator } from "@/components/ui/separator"
import { InformationRow } from "../../molecules/InformationRow"
import { UNKNOWN_VALUE } from "@/modules/loan-application-management/constants"
import { useLoanApplicationDetailContext } from "../../../providers/LoanApplicationDetailProvider"

export const BusinessInfoSummary = () => {
  const { loanSummary, loanKybDetail } = useLoanApplicationDetailContext()
  const businessInfo = loanSummary?.businessInfo

  return (
    <>
      <InformationRow
        label="Legal Name"
        value={businessInfo?.businessName?.value ?? UNKNOWN_VALUE}
        isBadge
        badgeText={businessInfo?.businessName?.status}
      />
      <Separator />
      <InformationRow
        label="Date of Incorporation"
        value={UNKNOWN_VALUE}
        isBadge
        badgeText="FAILED"
      />
      <Separator />
      <InformationRow
        label="Officer Address"
        value={businessInfo?.officeAddresses?.[0] ?? UNKNOWN_VALUE}
        isBadge
        badgeText={loanKybDetail?.insights?.officeAddressVerification}
      />
      <Separator />
      <InformationRow
        label="Tax ID"
        value={businessInfo?.tax?.value ?? UNKNOWN_VALUE}
        isBadge
        badgeText={businessInfo?.tax.status}
      />
      <Separator />
      <InformationRow
        label="Phone Number"
        value={
          (Array.isArray(businessInfo?.phoneNumber)
            ? businessInfo?.phoneNumber?.[0]
            : businessInfo?.phoneNumber) ?? "N/A"
        }
      />
    </>
  )
}
