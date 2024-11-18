import { cn } from "@/lib/utils"
import { checkIsWorkspaceAdmin } from "@/utils/check-roles"
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
import { isSbb } from "@/utils/domain.utils"

export function Component() {
  const isLenderAdmin = checkIsWorkspaceAdmin()

  return (
    <DashboardProvider>
      <div className="flex h-full flex-col bg-active">
        <div
          className={cn(
            "sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 border-b bg-white p-5",
            "md:px-8"
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center">
            <FilterTimeRange />
          </div>
        </div>
        <div className={cn("flex-1 space-y-6 bg-active p-6", "md:p-8")}>
          {isLenderAdmin && isEnableSubscriptionManagement() ? (
            <CurrentUsage />
          ) : null}
          <TotalApplicationActivity />
          {!isSbb() && (
            <>
              <Separator />

              <PerformanceMetrics />
              <div className="mt-8 flex flex-wrap gap-4">
                <AverageLoanSizeOfAllLoanProgram />
                <AverageApprovedLoanSizeChart />
              </div>
              <AverageTimeToApprovalChart />
            </>
          )}
        </div>
      </div>
    </DashboardProvider>
  )
}
