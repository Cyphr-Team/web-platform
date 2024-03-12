import { AccountSummaryTable } from "../organisms/cashflow/AccountSummary"

export const Component = () => {
  return (
    <div>
      <p className="text-2xl font-bold">Account Summary</p>
      <AccountSummaryTable />
    </div>
  )
}

Component.displayName = "CashFlowPage"
