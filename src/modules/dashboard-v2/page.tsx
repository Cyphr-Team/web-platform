import { cn } from "@/lib/utils"
import { checkIsLenderAdmin } from "@/utils/check-roles"
import { AverageApprovedLoanSizeChart } from "./components/AverageLoanSizeChart"
import { AverageTimeToApprovalChart } from "./components/AverageTimeToApprovalChart"
import { CurrentUsage } from "./components/atoms/CurrentUsage"
import { FilterTimeRange } from "./components/FilterTimeRange"
import { TotalApplicationActivity } from "./components/TotalApplicationActivity"
import { PerformanceMetrics } from "./components/PerformanceMetrics"
import { DashboardProvider } from "./providers/dashboard-provider"
import { AverageLoanSizeOfAllLoanProgram } from "./components/AverageLoanSizeOfAllLoanProgram"
import { Separator } from "@/components/ui/separator"
import { isEnableSubscriptionManagement } from "@/utils/feature-flag.utils"

export function Component() {
  const isLenderAdmin = checkIsLenderAdmin()

  return (
    <DashboardProvider>
      <div className="flex-col flex">
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-2 p-5 bg-white border-b sticky top-0 z-20",
            "md:px-8"
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

          <div className="flex items-center">
            <FilterTimeRange />
          </div>
        </div>

        <div className={cn("flex-1 space-y-6 p-6 pt-6 bg-active", "md:p-8")}>
          {isLenderAdmin && isEnableSubscriptionManagement() && (
            <CurrentUsage />
          )}
          <TotalApplicationActivity />

          <Separator />

          <PerformanceMetrics />
          <div className="flex gap-4 flex-wrap mt-8">
            <AverageLoanSizeOfAllLoanProgram />
            <AverageApprovedLoanSizeChart />
          </div>
          <AverageTimeToApprovalChart />
        </div>
      </div>
    </DashboardProvider>
  )
}
