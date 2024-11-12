import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { SectionTitle } from "../../../atoms/cashflows/SectionTitle"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { NoData } from "../../../atoms/NoData"
import { cn } from "@/lib/utils"
import { BankAccountReport } from "@/modules/loan-application-management/components/organisms/out-of-box/cash-flow/BankAccountReport.tsx"
import { Card } from "@/components/ui/card.tsx"
import { FeatureKey } from "@/hooks/useCanAccess"
import { FeatureRenderer } from "@/shared/layouts/FeatureRenderer"
import { CashFlowGlanceCard } from "../../../atoms/cashflows/CashflowGlanceCard"

export function CashflowGlanceReport() {
  const { newCashFlowGlance, isFetchingNewCashFlow } =
    useLoanApplicationDetailContext()

  return (
    <Card className="flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
      <div className="flex flex-col space-y-3xl">
        <SectionTitle>Cash Flow at a Glance</SectionTitle>

        <LoadingWrapper
          className={cn(
            isFetchingNewCashFlow &&
              "pb-10 gap-4 rounded-lg border bg-white min-h-40 flex items-center justify-center shadow-sm"
          )}
          isLoading={isFetchingNewCashFlow}
        >
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-4">
            <CashFlowGlanceCard
              isCurrency
              title="Revenue / Gross Income"
              value={newCashFlowGlance?.cashFlowGlance.revenue}
            />
            <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
              <CashFlowGlanceCard
                isCurrency
                title="Operating Expenses"
                value={newCashFlowGlance?.cashFlowGlance.operatingExpenses}
              />
            </FeatureRenderer>
            <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
              <CashFlowGlanceCard
                isCurrency
                title="Net Operating Income (NOI)"
                value={newCashFlowGlance?.cashFlowGlance.netOperatingIncome}
              />
            </FeatureRenderer>
            <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
              <CashFlowGlanceCard
                isPercent
                title="Operating Margin"
                value={newCashFlowGlance?.cashFlowGlance.operatingMargin}
              />
            </FeatureRenderer>
            <CashFlowGlanceCard
              isCurrency
              title="Total Debt Service (TDS)"
              value={newCashFlowGlance?.cashFlowGlance.totalDebtService}
            />
            <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
              <CashFlowGlanceCard
                title="Debt Service Coverage (DSCR)"
                value={newCashFlowGlance?.cashFlowGlance.debtServiceCoverage}
              />
            </FeatureRenderer>
            <CashFlowGlanceCard
              isPercent
              title="Debt-to-Income (DTI)"
              value={newCashFlowGlance?.cashFlowGlance.debtToIncome}
            />
          </div>
        </LoadingWrapper>
        <SectionTitle>Connected Bank Accounts</SectionTitle>
        <div>
          <LoadingWrapper
            className={cn(
              isFetchingNewCashFlow &&
                "pb-10 gap-4 rounded-lg border bg-white min-h-40 flex items-center justify-center shadow-sm"
            )}
            isLoading={isFetchingNewCashFlow}
          >
            {newCashFlowGlance?.bankAccountSummary ? (
              newCashFlowGlance?.bankAccountSummary?.map((data, index) => (
                <BankAccountReport
                  key={index}
                  className="mb-6"
                  data={data}
                  isLoading={isFetchingNewCashFlow}
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
