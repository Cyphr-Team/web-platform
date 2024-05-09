import { toCurrency, toPercent } from "@/utils"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardCard } from "./atoms/DashboardCard"
import { StatsTitle } from "./atoms/StatsTitle"

export const PerformanceMetrics = () => {
  const {
    isLoading,
    isLoadingAverageApprovalRate,
    averageApprovalRateData,
    aggregateApprovedLoanAmountData,
    isLoadingAggregateApprovedLoanAmount
  } = useDashboard()

  const data = {
    approvalRate: toPercent(averageApprovalRateData?.averageApprovalRate),
    totalLoanAmount: toCurrency(
      aggregateApprovedLoanAmountData?.totalApprovedLoanAmount,
      0
    ),
    averageLoanSize: toCurrency(
      aggregateApprovedLoanAmountData?.averageApprovedLoanSize,
      0
    )
  }

  const percentRateData = {
    approvalPercentRate: toPercent(averageApprovalRateData?.percentRate),
    totalLoanAmountPercentRate: toPercent(
      aggregateApprovedLoanAmountData?.percentRate
    ),
    averageApprovedLoanSizePercentRate: toPercent(
      aggregateApprovedLoanAmountData?.averageApprovedLoanSizePercentRate
    )
  }

  return (
    <div>
      <StatsTitle>Performance Metrics</StatsTitle>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Average Time to Approval"
          isLoading={isLoading}
          value={10}
          unit="Days"
          percentRate={27}
          revert
        />
        <DashboardCard
          title="Average Approval Rate"
          unit="%"
          isLoading={isLoadingAverageApprovalRate}
          value={data.approvalRate}
          percentRate={percentRateData.approvalPercentRate}
        />
        <DashboardCard
          title="Average Loan Size"
          isLoading={isLoadingAggregateApprovedLoanAmount}
          value={data.averageLoanSize}
          percentRate={percentRateData.averageApprovedLoanSizePercentRate}
        />
        <DashboardCard
          title="Total Approved Loan Amount"
          isLoading={isLoadingAggregateApprovedLoanAmount}
          value={data.totalLoanAmount}
          percentRate={percentRateData.totalLoanAmountPercentRate}
        />
      </div>
    </div>
  )
}
