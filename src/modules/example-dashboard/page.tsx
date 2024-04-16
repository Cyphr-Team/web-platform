import { TotalApplicationActivity } from "./components/TotalApplicationActivity"
import { TotalLoanActivity } from "./components/TotalLoanActivity"
import { FilterTimeRange } from "./components/FilterTimeRange"
import { DashboardProvider } from "./providers/dashboard-provider"
import { RateChart } from "./components/RateChart"
import { AverageTimeToApprovalChart } from "./components/AverageTimeToApprovalChart"
import { AverageApprovedLoanSizeChart } from "./components/AverageLoanSizeChart"
import { PortfolioGrowthChart } from "./components/PortfolioGrowthChart"
import { cn } from "@/lib/utils"

export function Component() {
  return (
    <DashboardProvider>
      <div className="flex-col flex">
        <div className={cn("flex-1 space-y-6 p-6 pt-6", "md:p-8")}>
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>

          <div className="flex items-center space-x-2">
            <FilterTimeRange />
          </div>

          <TotalLoanActivity />
          <TotalApplicationActivity />
          <RateChart />
          <AverageTimeToApprovalChart />
          <AverageApprovedLoanSizeChart />
          <PortfolioGrowthChart />
        </div>
      </div>
    </DashboardProvider>
  )
}
