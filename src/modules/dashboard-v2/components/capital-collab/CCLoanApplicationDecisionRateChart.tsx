import { useDashboard } from "@/modules/dashboard-v2/providers/dashboard-provider"
import ChartCard from "@/shared/molecules/chart-card"
import LoanApplicationDecisionRateChart from "@/shared/organisms/charts/loan-application-decision-rate-chart"

export function CapitalCollabLoanApplicationDecisionRateChart() {
  const { loanApplicationRatesData, dashboardState } = useDashboard()

  return (
    <ChartCard className="w-full flex-1" title="Incomplete Application Rate">
      <LoanApplicationDecisionRateChart
        data={
          loanApplicationRatesData?.incompleteApplicationRate?.map((v) => ({
            date: v.date,
            incompleteRate: v.rate * 100
          })) ?? []
        }
        timePeriod={dashboardState.frequency}
      />
    </ChartCard>
  )
}
