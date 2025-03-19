import { DashboardCard } from "@/modules/dashboard-v2/components/atoms/DashboardCard"
import { StatsTitle } from "@/modules/dashboard-v2/components/atoms/StatsTitle"
import { MOCK_PERFORMANCE_METRICS } from "../../constants/data"

export function PerformanceMetrics() {
  const isLoadingAverageApprovalRate = false
  const isLoadingAggregateApprovedLoanAmount = false
  const isLoadingAverageTimeToApproval = false

  const data = MOCK_PERFORMANCE_METRICS.data

  const percentRateData = MOCK_PERFORMANCE_METRICS.percentRateData

  return (
    <div>
      <StatsTitle>Performance Metrics</StatsTitle>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
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
