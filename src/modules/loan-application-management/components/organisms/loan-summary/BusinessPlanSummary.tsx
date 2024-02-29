import { Separator } from "@/components/ui/separator"
import { InformationRow } from "../../molecules/InformationRow"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { SummaryCollectStatus } from "@/modules/loan-application-management/constants/types/loan-summary.type"

export const BusinessPlanSummary = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const businessPlan = loanSummary?.businessPlan

  return (
    <>
      <InformationRow
        label="Executive Summary"
        isBadge
        badgeText={SummaryCollectStatus.UNKNOWN}
      />
      <Separator />
      <InformationRow
        label="3-year Business Plan"
        isBadge
        badgeText={businessPlan?.threeYear}
      />
      <Separator />
      <InformationRow
        label="5-year Business Plan"
        isBadge
        badgeText={businessPlan?.fiveYear}
      />
    </>
  )
}
