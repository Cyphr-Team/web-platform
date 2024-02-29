import { UNKNOWN_VALUE } from "@/modules/loan-application-management/constants"
import { useLoanApplicationDetailContext } from "../../../providers/LoanApplicationDetailProvider"
import { InformationRow } from "../../molecules/InformationRow"
import { Separator } from "@/components/ui/separator"

export const IDCheckSummary = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const idCheck = loanSummary?.idCheck

  return (
    <>
      <InformationRow
        label="Drivers License"
        value={idCheck?.driverLicense?.reason ?? UNKNOWN_VALUE}
        isBadge
        badgeText={idCheck?.driverLicense?.status}
      />
      <Separator />
      <InformationRow
        label="Passport"
        isBadge
        hasAction
        badgeText={idCheck?.passport?.status}
      />
    </>
  )
}
