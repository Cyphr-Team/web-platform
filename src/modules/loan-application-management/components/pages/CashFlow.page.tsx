import { AccountSummaryTable } from "../organisms/cashflow/AccountSummary"
import { CashFlowGlance } from "../organisms/cashflow/CashFlowGlance"

export const Component = () => {
  return (
    <div>
      <AccountSummaryTable />
      <CashFlowGlance />
    </div>
  )
}

Component.displayName = "CashFlowPage"
