import { toCurrency, toPercent } from "@/utils"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardCard } from "./atoms/DashboardCard"
import { StatsTitle } from "./atoms/StatsTitle"

export function PerformanceMetrics() {
  const {
    isLoadingAverageApprovalRate,
    averageApprovalRateData,
    aggregateApprovedLoanAmountData,
    isLoadingAggregateApprovedLoanAmount,
    averageTimeToApprovalData,
    isLoadingAverageTimeToApproval
  } = useDashboard()

  const data = {
    averageTimeToApproval: Math.round(
      averageTimeToApprovalData?.averageTimeToApproval ?? 0
    ),
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
    averageTimeToApprovalPercentRate: toPercent(
      averageTimeToApprovalData?.percentRate
    ),
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
          revert
          isLoading={isLoadingAverageTimeToApproval}
          percentRate={percentRateData.averageTimeToApprovalPercentRate}
          title="Average Time to Approval"
          unit="Days"
          value={data.averageTimeToApproval}
        />
        <DashboardCard
          isLoading={isLoadingAverageApprovalRate}
          percentRate={percentRateData.approvalPercentRate}
          title="Average Approval Rate"
          unit="%"
          value={data.approvalRate}
        />
        <DashboardCard
          isLoading={isLoadingAggregateApprovedLoanAmount}
          percentRate={percentRateData.averageApprovedLoanSizePercentRate}
          title="Average Loan Size"
          value={data.averageLoanSize}
        />
        <DashboardCard
          isLoading={isLoadingAggregateApprovedLoanAmount}
          percentRate={percentRateData.totalLoanAmountPercentRate}
          title="Total Approved Loan Amount"
          value={data.totalLoanAmount}
        />
      </div>
    </div>
  )
}
