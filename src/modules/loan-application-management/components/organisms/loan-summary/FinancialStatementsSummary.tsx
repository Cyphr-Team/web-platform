import { Separator } from "@/components/ui/separator"
import { InformationRow } from "../../molecules/InformationRow"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"

export const FinancialStatementsSummary = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const financial = loanSummary?.financialStatements

  return (
    <>
      <InformationRow
        label="Balance Sheet - Historical (2017 - 2022)"
        isBadge
        badgeText={financial?.balanceSheetHistorical}
      />
      <Separator />
      <InformationRow
        label="Income Statement - Historical (2017 - 2022)"
        isBadge
        badgeText={financial?.incomeStatementHistorical}
      />
      <Separator />
      <InformationRow
        label="Statement of Cash Flow - Historical (2017 - 2022)"
        isBadge
        badgeText={financial?.cashFlowStatementHistorical}
      />
      <Separator />
      <InformationRow
        label="Balance Sheet - Projected (2023 - 2027)"
        isBadge
        badgeText={financial?.balanceSheetProjected}
      />
      <Separator />
      <InformationRow
        label="Income Statement - Projected (2023 - 2027)"
        isBadge
        badgeText={financial?.incomeStatementProjected}
      />
      <Separator />
      <InformationRow
        label="Statement of Cash Flow - Projected (2023 - 2027)"
        isBadge
        badgeText={financial?.cashFlowStatementProjected}
      />
    </>
  )
}
