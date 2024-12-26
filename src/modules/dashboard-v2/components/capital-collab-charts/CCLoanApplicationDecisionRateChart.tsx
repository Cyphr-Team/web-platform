import { useDashboard } from "@/modules/dashboard-v2/providers/dashboard-provider"
import ChartCard from "@/shared/molecules/chart-card"
import { LoanApplicationDecisionRateChart } from "@/shared/organisms/charts/loan-application-decision-rate-chart"

export function CapitalCollabLoanApplicationDecisionRateChart() {
  const { loanApplicationRatesData, dashboardState } = useDashboard()

  return (
    <ChartCard className="w-full flex-1" title="Incomplete Application Rate">
      <div className="min-h-[200px] size-full flex flex-row">
        <span
          className="tracking-wide text-xs text-center text-muted-foreground
      [writing-mode:vertical-lr] whitespace-nowrap -rotate-180 text-nowrap"
        >
          Incomplete Application Rate
        </span>
        <LoanApplicationDecisionRateChart
          data={
            loanApplicationRatesData?.incompleteApplicationRate?.map((v) => ({
              date: v.date,
              incompleteRate: v.rate * 100
            })) ?? []
          }
          timePeriod={dashboardState.loanApplicationRatesFrequency}
        />
      </div>
    </ChartCard>
  )
}
