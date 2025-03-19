import { useDashboard } from "@/modules/dashboard-v2/providers/dashboard-provider"
import { getStatusDisplayName } from "@/modules/loan-application/capital-collab/services"
import ChartCard from "@/shared/molecules/chart-card"
import LoanApplicationActivityChart from "@/shared/organisms/charts/loan-application-activity-chart"
import { LoanApplicationStatus } from "@/types/loan-application.type"

const chartConfig = {
  [LoanApplicationStatus.DRAFT]: {
    label: getStatusDisplayName(LoanApplicationStatus.DRAFT),
    color: "#66708566"
  },
  [LoanApplicationStatus.SUBMITTED]: {
    label: getStatusDisplayName(LoanApplicationStatus.SUBMITTED),
    color: "#008C8A80"
  },
  [LoanApplicationStatus.CCC_DECLINED]: {
    label: getStatusDisplayName(LoanApplicationStatus.CCC_DECLINED),
    color: "#BE381B80"
  },
  [LoanApplicationStatus.CCC_APPROVED]: {
    label: getStatusDisplayName(LoanApplicationStatus.CCC_APPROVED),
    color: "#027A4880"
  },
  [LoanApplicationStatus.CCC_FUNDED]: {
    label: getStatusDisplayName(LoanApplicationStatus.CCC_FUNDED),
    color: "#13347280"
  }
}

export function CapitalCollabLoanApplicationActivityChart() {
  const { ccloanApplicationActivitiesData, dashboardState } = useDashboard()

  const adaptedChartData =
    ccloanApplicationActivitiesData?.result.map((v) => ({
      time: v.date,
      [LoanApplicationStatus.DRAFT]: v.totalApplicationDraft,
      [LoanApplicationStatus.SUBMITTED]: v.totalApplicationSubmitted,
      [LoanApplicationStatus.IN_REVIEW]: v.totalApplicationInReview,
      [LoanApplicationStatus.CCC_APPROVED]: v.totalApplicationApproved,
      [LoanApplicationStatus.CCC_DECLINED]: v.totalApplicationDeclined,
      [LoanApplicationStatus.CCC_FUNDED]: v.totalApplicationFunded
    })) ?? []

  return (
    <ChartCard className="w-full flex-1" title="Loan Application">
      <LoanApplicationActivityChart
        chartConfig={chartConfig}
        data={adaptedChartData}
        timePeriod={dashboardState.loanApplicationActivitiesFrequency}
      />
    </ChartCard>
  )
}
