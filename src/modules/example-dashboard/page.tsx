import { TotalApplicationActivity } from "./components/TotalApplicationActivity"
import { TotalLoanActivity } from "./components/TotalLoanActivity"
import { FilterTimeRange } from "./components/FilterTimeRange"
import { DashboardProvider } from "./providers/dashboard-provider"
import { RateChart } from "./components/RateChart"
import { AverageTimeToApprovalChart } from "./components/AverageTimeToApprovalChart"
import { AverageApprovedLoanSizeChart } from "./components/AverageLoanSizeChart"

export function Component() {
  return (
    <DashboardProvider>
      <div className="flex-col flex">
        <div className="flex-1 space-y-6 p-8 pt-6">
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
        </div>
      </div>
    </DashboardProvider>
  )
}
