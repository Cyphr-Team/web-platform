import { Separator } from "@/components/ui/separator"
import { InformationRow } from "../../molecules/InformationRow"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"

export const SBAFormsSummary = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const sbaForm = loanSummary?.sba7aForms

  return (
    <>
      <InformationRow
        label="SBA Form 1919 (Borrower Information Form)"
        isBadge
        badgeText={sbaForm?.sbaForm1919}
      />
      <Separator />
      <InformationRow
        label="SBA Form 912 (Statement of Personal History)"
        isBadge
        badgeText={sbaForm?.sbaForm912}
      />
      <Separator />
      <InformationRow
        label="SBA Form 413 (Personal Financial Statement)"
        isBadge
        badgeText={sbaForm?.sbaForm413}
      />
    </>
  )
}
