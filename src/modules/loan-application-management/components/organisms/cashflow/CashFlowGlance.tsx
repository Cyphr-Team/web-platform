import {
  CASH_FLOW_GLANCE,
  CASH_FLOW_GLANCE_FAKE_DATA,
  FAKE_ACCOUNT_SUMMARY_DATA,
  FAKE_GRAPH_BALANCE_DATA,
  FAKE_REVENUE_EXPENSE_DATA,
  FAKE_SUMMARY_DATA
} from "@/modules/loan-application-management/constants"
import { CashFlowGlanceItem } from "../../atoms/CashFlowGlanceItem"
import { AccountBalanceChart } from "../../molecules/cashflow/AccountBalanceChart"
import { Card } from "@/components/ui/card"
import { RevenueAndExpenseChart } from "../../molecules/cashflow/RevenueAndExpenseChart"
import { SummaryChart } from "../../molecules/cashflow/SummaryChart"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { CashFlowGlanceType } from "@/modules/loan-application-management/constants/types/cashflow.type"

// Temp add FAKE data for demo purpose

export const CashFlowGlance = () => {
  const { cashFlowAnalysis } = useLoanApplicationDetailContext()
  return (
    <div>
      <div className="flex items-center mb-4">
        <p className="font-medium px-2 flex-1 text-xl">Cash Flow at a Glance</p>
      </div>
      <div className="flex w-full bg-gray-100">
        {CASH_FLOW_GLANCE.map((item, index) => (
          <CashFlowGlanceItem
            key={index}
            title={item.title}
            description={item.description}
            value={
              cashFlowAnalysis?.cashFlowGlance[
                item.key as keyof CashFlowGlanceType
              ] ??
              CASH_FLOW_GLANCE_FAKE_DATA[item.key as keyof CashFlowGlanceType]
            }
            isNegative={item.isNegative}
            isCurrency={item.isCurrency}
          />
        ))}
      </div>
      <Card className="mt-4 p-4 gap-4">
        <h3 className="text-xl font-medium">Balance History</h3>
        <AccountBalanceChart
          data={cashFlowAnalysis?.balancesGraph ?? FAKE_GRAPH_BALANCE_DATA}
          bankInformation={
            cashFlowAnalysis?.bankAccountSummary ?? FAKE_ACCOUNT_SUMMARY_DATA
          }
        />
      </Card>
      <Card className="mt-4 p-4 gap-4">
        <h3 className="text-xl font-medium">Revenue vs Expense</h3>
        <RevenueAndExpenseChart
          data={
            cashFlowAnalysis?.revenueVsExpenseGraph ?? FAKE_REVENUE_EXPENSE_DATA
          }
        />
      </Card>
      <Card className="mt-4 p-4 gap-4">
        <h3 className="text-xl font-medium">Summary by Transaction Tag</h3>

        <SummaryChart
          data={cashFlowAnalysis?.summaryByTransactionTag ?? FAKE_SUMMARY_DATA}
        />
      </Card>
    </div>
  )
}
