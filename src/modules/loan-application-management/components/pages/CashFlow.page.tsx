import { AccountSummaryTable } from "../organisms/cashflow/AccountSummary"
import { CashFlowGlance } from "../organisms/cashflow/CashFlowGlance"

export const Component = () => {
  return (
    <div>
      <p className="text-2xl font-bold">Account Summary</p>
      <AccountSummaryTable />
      <CashFlowGlance />
    </div>
  )
}

Component.displayName = "CashFlowPage"
