import { SectionTitle } from "../../../atoms/cashflows/SectionTitle"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { NoData } from "../../../atoms/NoData"
import { cn } from "@/lib/utils"
import { BankAccountReport } from "@/modules/loan-application-management/components/organisms/out-of-box/cash-flow/BankAccountReport.tsx"
import { type CashFlowGlanceResponse } from "@/modules/loan-application-management/constants/types/v2/cashflow.type"
import React from "react"
import { FeatureRenderer } from "@/shared/layouts/FeatureRenderer"
import { FeatureKey } from "@/hooks/useCanAccess"
import { CashFlowGlanceCard } from "@/modules/loan-application-management/components/atoms/cashflows/CashflowGlanceCard.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { PlaidMonthlyOverview } from "@/modules/loan-application/capital-collab/components/organisms/PlaidMonthlyOverview.tsx"
import { isCapitalCollab } from "@/utils/domain.utils"

interface CashflowGlanceReportProps {
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
        className={cn(
          isFetchingNewCashFlow &&
            "flex min-h-40 items-center justify-center gap-4 rounded-lg border bg-white pb-10 shadow-sm"
        )}
        isLoading={isFetchingNewCashFlow}
      >
        <div
          className={cn(
            "grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-4",
            isCapitalCollab() && "xl:grid-cols-4"
          )}
        >
          <CashFlowGlanceCard
            isCurrency
            title="Revenue / Gross Income"
            value={newCashFlowGlance?.cashFlowGlance.revenue}
          />
          <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
            <CashFlowGlanceCard
              isCurrency
              title="Operating Expenses"
              value={newCashFlowGlance?.cashFlowGlance?.operatingExpenses}
            />
          </FeatureRenderer>
          <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
            <CashFlowGlanceCard
              isCurrency
              title="Net Operating Income (NOI)"
              value={newCashFlowGlance?.cashFlowGlance?.netOperatingIncome}
            />
          </FeatureRenderer>
          <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
            <CashFlowGlanceCard
              isPercent
              title="Operating Margin"
              value={newCashFlowGlance?.cashFlowGlance?.operatingMargin}
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
              value={newCashFlowGlance?.cashFlowGlance?.debtServiceCoverage}
            />
          </FeatureRenderer>
          <CashFlowGlanceCard
            isPercent
            title="Debt-to-Income (DTI)"
            value={newCashFlowGlance?.cashFlowGlance.debtToIncome}
          />
          {isCapitalCollab() && (
            <CashFlowGlanceCard
              isCurrency
              title="Average Transaction Size"
              value={newCashFlowGlance?.cashFlowGlance.averageTransactionSize}
            />
          )}
        </div>
      </LoadingWrapper>
      {isCapitalCollab() && (
        <>
          <Separator />
          <SectionTitle>Monthly Overview</SectionTitle>
          <PlaidMonthlyOverview />
          <Separator />
        </>
      )}
      <SectionTitle>Connected Bank Accounts</SectionTitle>
      <LoadingWrapper
        className={cn(
          isFetchingNewCashFlow &&
            "flex min-h-40 items-center justify-center gap-4 rounded-lg border bg-white pb-10 shadow-sm"
        )}
        isLoading={isFetchingNewCashFlow}
      >
        {newCashFlowGlance?.bankAccountSummary ? (
          newCashFlowGlance?.bankAccountSummary?.map((data) => (
            <BankAccountReport
              key={data.bankAccountPk}
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
  )
}
