import { useLoanApplicationDetailContext } from "../../../providers/LoanApplicationDetailProvider"
import { InformationRow } from "../../molecules/InformationRow"
import { Separator } from "@/components/ui/separator"

export const IDCheckSummary = () => {
  const { loanKycDetail } = useLoanApplicationDetailContext()

  return (
    <>
      <InformationRow
        label="Drivers License"
        value={loanKycDetail?.idCheck?.driverLicense?.reason}
        isBadge
        badgeText={loanKycDetail?.idCheck?.driverLicense?.status}
      />
      <Separator />
      <InformationRow
        label="Passport"
        isBadge
        hasAction
        badgeText={loanKycDetail?.idCheck?.passport?.status ?? "N/A"}
      />
    </>
  )
}
