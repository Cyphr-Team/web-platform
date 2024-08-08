import { SectionTitle } from "../../../atoms/cashflows/SectionTitle"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { NoData } from "../../../atoms/NoData"
import { cn } from "@/lib/utils"
import { CashflowGlanceCard } from "../../../atoms/cashflows/CashflowGlanceCard"
import { BankAccountReport } from "@/modules/loan-application-management/components/organisms/out-of-box/cash-flow/BankAccountReport.tsx"
import { CashFlowGlanceResponse } from "@/modules/loan-application-management/constants/types/v2/cashflow.type"
import React from "react"
import { FeatureRenderer } from "@/shared/layouts/FeatureRenderer"
import { FeatureKey } from "@/hooks/useCanAccess"

type CashflowGlanceReportProps = {
  newCashFlowGlance?: CashFlowGlanceResponse
  isFetchingNewCashFlow: boolean
}

export const CashflowGlanceReport: React.FC<CashflowGlanceReportProps> = ({
  newCashFlowGlance,
  isFetchingNewCashFlow
}) => {
  return (
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
          <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
            <CashflowGlanceCard
              title="Operating Expenses"
              value={newCashFlowGlance?.cashFlowGlance?.operatingExpenses}
              isCurrency={true}
            />
          </FeatureRenderer>
          <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
            <CashflowGlanceCard
              title="Net Operating Income (NOI)"
              value={newCashFlowGlance?.cashFlowGlance?.netOperatingIncome}
              isCurrency={true}
            />
          </FeatureRenderer>
          <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
            <CashflowGlanceCard
              title="Operating Margin"
              value={newCashFlowGlance?.cashFlowGlance?.operatingMargin}
              isPercent={true}
            />
          </FeatureRenderer>
          <CashflowGlanceCard
            title="Total Debt Service (TDS)"
            value={newCashFlowGlance?.cashFlowGlance.totalDebtService}
            isCurrency={true}
          />
          <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
            <CashflowGlanceCard
              title="Debt Service Coverage (DSCR)"
              value={newCashFlowGlance?.cashFlowGlance?.debtServiceCoverage}
            />
          </FeatureRenderer>
          <CashflowGlanceCard
            title="Debt-to-Income (DTI)"
            value={newCashFlowGlance?.cashFlowGlance.debtToIncome}
            isPercent={true}
          />
        </div>
      </LoadingWrapper>
      <SectionTitle>Connected Bank Accounts</SectionTitle>
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
  )
}
