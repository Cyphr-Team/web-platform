import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { SectionTitle } from "../../../atoms/cashflows/SectionTitle"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { NoData } from "../../../atoms/NoData"
import { cn } from "@/lib/utils"
import { CashflowGlanceCard } from "../../../molecules/cashflow/CashflowGlanceCard"
import { BankAccountReport } from "@/modules/loan-application-management/components/organisms/out-of-box/cash-flow/BankAccountReport.tsx"
import { Card } from "@/components/ui/card.tsx"

export const CashflowGlanceReport = () => {
  const { newCashFlowGlance, isFetchingNewCashFlow } =
    useLoanApplicationDetailContext()

  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto shadow-none">
      <div className="flex flex-col space-y-3xl">
        <SectionTitle>Cash Flow at a Glance</SectionTitle>

        <LoadingWrapper
          isLoading={isFetchingNewCashFlow}
          className={cn(
            isFetchingNewCashFlow &&
              "pb-10 gap-4 rounded-lg border bg-white min-h-40 flex items-center justify-center shadow-sm"
          )}
        >
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-4">
            <CashflowGlanceCard
              title="Revenue / Gross Income"
              value={newCashFlowGlance?.cashFlowGlance.revenue}
              isCurrency={true}
            />
            <CashflowGlanceCard
              title="Operating Expenses"
              value={newCashFlowGlance?.cashFlowGlance.operatingExpenses}
              isCurrency={true}
            />
            <CashflowGlanceCard
              title="Net Operating Income (NOI)"
              value={newCashFlowGlance?.cashFlowGlance.netOperatingIncome}
              isCurrency={true}
            />
            <CashflowGlanceCard
              title="Operating Margin"
              value={newCashFlowGlance?.cashFlowGlance.operatingMargin}
              isPercent={true}
            />
            <CashflowGlanceCard
              title="Total Debt Service (TDS)"
              value={newCashFlowGlance?.cashFlowGlance.totalDebtService}
              isCurrency={true}
            />
            <CashflowGlanceCard
              title="Debt Service Coverage (DSCR)"
              value={newCashFlowGlance?.cashFlowGlance.debtServiceCoverage}
            />
            <CashflowGlanceCard
              title="Debt-to-Income (DTI)"
              value={newCashFlowGlance?.cashFlowGlance.debtToIncome}
              isPercent={true}
            />
          </div>
        </LoadingWrapper>
        <SectionTitle>Connected Bank Accounts</SectionTitle>
        <div>
          <LoadingWrapper
            isLoading={isFetchingNewCashFlow}
            className={cn(
              isFetchingNewCashFlow &&
                "pb-10 gap-4 rounded-lg border bg-white min-h-40 flex items-center justify-center shadow-sm"
            )}
          >
            {newCashFlowGlance?.bankAccountSummary ? (
              newCashFlowGlance?.bankAccountSummary?.map((data, index) => (
                <BankAccountReport
                  key={index}
                  data={data}
                  isLoading={isFetchingNewCashFlow}
                  className="mb-6"
                />
              ))
            ) : (
              <NoData />
            )}
          </LoadingWrapper>
        </div>
      </div>
    </Card>
  )
}
