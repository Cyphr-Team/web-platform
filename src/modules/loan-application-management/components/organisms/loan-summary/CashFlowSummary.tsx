import { Separator } from "@/components/ui/separator"
import { InformationRow } from "../../molecules/InformationRow"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"

export const CashFlowSummary = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const cashFlow = loanSummary?.cashFlowDocumentation

  return (
    <>
      <InformationRow
        label="Business Tax Returns (2020, 2021, 2022)"
        isBadge
        badgeText={cashFlow?.businessTaxReturns}
      />
      <Separator />
      <InformationRow
        label="Bank Statements (Oct 2023 + Nov 2023)"
        isBadge
        badgeText={cashFlow?.bankStatements}
      />
      <Separator />
      <InformationRow
        label="List of Outstanding Business Debts"
        isBadge
        badgeText={cashFlow?.listOfOutstandingBusinessDebts}
      />
    </>
  )
}
