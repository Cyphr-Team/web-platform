import { CASH_FLOW_GLANCE } from "@/modules/loan-application-management/constants"
import { CashFlowGlanceItem } from "../../atoms/CashFlowGlanceItem"
import { AccountBalanceChart } from "../../molecules/cashflow/AccountBalanceChart"
import { Card } from "@/components/ui/card"
import { RevenueAndExpenseChart } from "../../molecules/cashflow/RevenueAndExpenseChart"
import { SummaryChart } from "../../molecules/cashflow/SummaryChart"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { CashFlowGlanceType } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { NoData } from "../../atoms/NoData"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"

export const CashFlowGlance = () => {
  const { cashFlowAnalysis, isFetchingCashflow } =
    useLoanApplicationDetailContext()
  return (
    <div className="mt-4">
      <Card className="p-4 gap-4 min-h-40">
        <div className="flex items-center mb-4">
          <h3 className="text-xl font-medium">Cash Flow at a Glance</h3>
        </div>
        <LoadingWrapper isLoading={isFetchingCashflow}>
          {cashFlowAnalysis?.cashFlowGlance ? (
            <div className="flex w-full bg-gray-100">
              {CASH_FLOW_GLANCE.map((item, index) => (
                <CashFlowGlanceItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  value={
                    cashFlowAnalysis?.cashFlowGlance[
                      item.key as keyof CashFlowGlanceType
                    ] ?? 0
                  }
                  isNegative={item.isNegative}
                  isCurrency={item.isCurrency}
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
