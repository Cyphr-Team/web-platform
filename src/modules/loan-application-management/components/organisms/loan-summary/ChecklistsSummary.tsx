import { useLoanApplicationDetailContext } from "../../../providers/LoanApplicationDetailProvider"
import { InformationRow } from "../../molecules/InformationRow"
import { Separator } from "@/components/ui/separator"

export const ChecklistsSummary = () => {
  const { loanKycDetail } = useLoanApplicationDetailContext()

  return (
    <>
      <InformationRow
        label="PEP/Sanctions"
        isBadge
        value={loanKycDetail?.checkLists?.pepSanctions.reason}
        badgeText={loanKycDetail?.checkLists?.pepSanctions.status}
      />
      <Separator />
      <InformationRow
        label="Internal Blocklist"
        value={loanKycDetail?.checkLists?.internalBlocklist.reason}
        isBadge
        badgeText={loanKycDetail?.checkLists?.internalBlocklist.status}
      />
      <Separator />
      <InformationRow
        label="Duplicate"
        value={loanKycDetail?.checkLists?.duplicate.reason}
        isBadge
        hasAction
        badgeText={loanKycDetail?.checkLists?.duplicate.status}
      />
      <Separator />
      <InformationRow
        label="Fraud Check"
        value={loanKycDetail?.checkLists?.fraud.reason}
        isBadge
        badgeText={loanKycDetail?.checkLists?.fraud.status}
      />
      <Separator />
      <InformationRow
        label="Biometrics"
        value={loanKycDetail?.checkLists.biometrics?.reason}
        isBadge
        badgeText={loanKycDetail?.checkLists.biometrics?.status}
      />
    </>
  )
}
