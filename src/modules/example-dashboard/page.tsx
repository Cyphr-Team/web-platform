import { cn } from "@/lib/utils"
import { checkIsLenderAdmin } from "@/utils/check-roles"
import { AverageApprovedLoanSizeChart } from "./components/AverageLoanSizeChart"
import { AverageTimeToApprovalChart } from "./components/AverageTimeToApprovalChart"
import { CurrentUsage } from "./components/CurrentUsage"
import { FilterTimeRange } from "./components/FilterTimeRange"
import { PortfolioGrowthChart } from "./components/PortfolioGrowthChart"
import { RateChart } from "./components/RateChart"
import { TotalApplicationActivity } from "./components/TotalApplicationActivity"
import { TotalLoanActivity } from "./components/TotalLoanActivity"
import { DashboardProvider } from "./providers/dashboard-provider"

export function Component() {
  const isLenderAdmin = checkIsLenderAdmin()

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

          {isLenderAdmin && <CurrentUsage />}
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
