import { useDashboard } from "@/modules/dashboard-v2/providers/dashboard-provider"
import ChartCard from "@/shared/molecules/chart-card"
import LoanApplicationActivityChart from "@/shared/organisms/charts/loan-application-activity-chart"

export function CapitalCollabLoanApplicationActivityChart() {
  const { loanApplicationActivitiesData, dashboardState } = useDashboard()

  return (
    <ChartCard className="w-full flex-1" title="Loan Application">
      <LoanApplicationActivityChart
        data={
          loanApplicationActivitiesData?.loanApplicationActivities.map((v) => ({
            name: v.date,
            draft: v.totalApplicationDraft,
            submitted: v.totalApplicationSubmitted,
            inreview: v.totalApplicationInReview,
            approved: v.totalApplicationApproved,
            denied: v.totalApplicationDenied
          })) ?? []
        }
        timePeriod={dashboardState.loanApplicationActivitiesFrequency}
      />
    </ChartCard>
  )
}
