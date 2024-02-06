import { Separator } from "@/components/ui/separator"
import { InformationRow } from "../../molecules/InformationRow"
import { UNKNOWN_VALUE } from "@/modules/loan-application-management/constants"
import { useLoanApplicationDetailContext } from "../../../providers/LoanApplicationDetailProvider"

export const BusinessInfoSummary = () => {
  const { loanKybDetail } = useLoanApplicationDetailContext()

  return (
    <>
      <InformationRow
        label="Legal Name"
        value={loanKybDetail?.businessName?.value}
        isBadge
        badgeText={loanKybDetail?.businessName?.status}
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
        value={loanKybDetail?.officeAddresses?.[0]}
        isBadge
        badgeText={loanKybDetail?.insights?.officeAddressVerification}
      />
      <Separator />
      <InformationRow
        label="Tax ID"
        value={loanKybDetail?.tax?.value}
        isBadge
        badgeText={loanKybDetail?.tax.status}
      />
      <Separator />
      <InformationRow
        label="Phone Number"
        value={
          Array.isArray(loanKybDetail?.phoneNumber)
            ? loanKybDetail?.phoneNumber?.[0]
            : loanKybDetail?.phoneNumber
        }
      />
    </>
  )
}
