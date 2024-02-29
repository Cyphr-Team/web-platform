import { UNKNOWN_VALUE } from "@/modules/loan-application-management/constants"
import { useLoanApplicationDetailContext } from "../../../providers/LoanApplicationDetailProvider"
import { InformationRow } from "../../molecules/InformationRow"
import { Separator } from "@/components/ui/separator"

export const ChecklistsSummary = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const checkLists = loanSummary?.checkLists

  return (
    <>
      <InformationRow
        label="PEP/Sanctions"
        isBadge
        value={checkLists?.pepSanctions?.reason ?? UNKNOWN_VALUE}
        badgeText={checkLists?.pepSanctions?.status}
      />
      <Separator />
      <InformationRow
        label="Internal Blocklist"
        value={checkLists?.internalBlocklist?.reason ?? UNKNOWN_VALUE}
        isBadge
        badgeText={checkLists?.internalBlocklist?.status}
      />
      <Separator />
      <InformationRow
        label="Duplicate"
        value={checkLists?.duplicate?.reason ?? UNKNOWN_VALUE}
        isBadge
        hasAction
        badgeText={checkLists?.duplicate?.status}
      />
      <Separator />
      <InformationRow
        label="Fraud Check"
        value={checkLists?.fraud?.reason ?? UNKNOWN_VALUE}
        isBadge
        badgeText={checkLists?.fraud?.status}
      />
      <Separator />
      <InformationRow
        label="Biometrics"
        value={checkLists?.biometrics?.reason ?? UNKNOWN_VALUE}
        isBadge
        badgeText={checkLists?.biometrics?.status}
      />
    </>
  )
}
