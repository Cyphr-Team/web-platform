import { CASH_FLOW_GLANCE } from "@/modules/loan-application-management/constants"
import { CashFlowGlanceItem } from "../../atoms/CashFlowGlanceItem"
import { AccountBalanceChart } from "../../molecules/cashflow/chart/AccountBalanceChart"
import { Card } from "@/components/ui/card"
import { SummaryChart } from "../../molecules/cashflow/chart/SummaryChart"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { type CashFlowGlanceType } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { NoData } from "../../atoms/NoData"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { RevenueAndExpenseChart } from "../../molecules/cashflow/chart/RevenueAndExpenseChart"

export function CashFlowGlance() {
  const { cashFlowAnalysis, isFetchingCashflow } =
    useLoanApplicationDetailContext()

  return (
    <div className="mt-4">
      <Card className="min-h-40 gap-4 p-4">
        <div className="mb-4 flex items-center">
          <h3 className="text-xl font-medium">Cash Flow at a Glance</h3>
        </div>
        <LoadingWrapper isLoading={isFetchingCashflow}>
          {cashFlowAnalysis?.cashFlowGlance ? (
            <div className="flex w-full bg-gray-100">
              {CASH_FLOW_GLANCE.map((item, index) => (
                <CashFlowGlanceItem
                  key={index}
                  description={item.description}
                  isCurrency={item.isCurrency}
                  isNegative={item.isNegative}
                  title={item.title}
                  value={
                    cashFlowAnalysis?.cashFlowGlance[
                      item.key as keyof CashFlowGlanceType
                    ]
                  }
                />
              ))}
            </div>
          ) : (
            <NoData />
          )}
        </LoadingWrapper>
      </Card>
      <AccountBalanceChart />
      <RevenueAndExpenseChart />
      <SummaryChart />
    </div>
  )
}
