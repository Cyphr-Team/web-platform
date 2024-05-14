import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardSingleNumberCard } from "./atoms/DashboardSingleNumberCard"
import { LoanApplicationActivityChart } from "./LoanApplicationActivityChart"
import { StatsTitle } from "./atoms/StatsTitle"
import { LoanApplicationDecisionRateChart } from "./LoanApplicationDecisionRateChart"

export const TotalApplicationActivity = () => {
  const { isLoading, statsData } = useDashboard()

  const data = {
    totalApplicationsSubmitted: statsData?.totalApplicationSubmitted,
    totalApplicationsInReview: statsData?.totalApplicationInReview,
    totalApplicationsDenied: statsData?.totalApplicationDenied,
    totalApplicationsApproved: statsData?.totalApplicationApproved
  }

  return (
    <div>
      <StatsTitle>Application Activity</StatsTitle>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardSingleNumberCard
          isLoading={isLoading}
          title="Submitted"
          value={data.totalApplicationsSubmitted}
          variantColor={getBadgeVariantByStatus(
            LoanApplicationStatus.SUBMITTED
          )}
          unit="Apps"
        />
        <DashboardSingleNumberCard
          isLoading={isLoading}
          title="In Review"
          value={data.totalApplicationsInReview}
          variantColor={getBadgeVariantByStatus(
            LoanApplicationStatus.IN_REVIEW
          )}
          unit="Apps"
        />
        <DashboardSingleNumberCard
          isLoading={isLoading}
          title="Approved"
          value={data.totalApplicationsApproved}
          variantColor={getBadgeVariantByStatus(LoanApplicationStatus.APPROVED)}
          unit="Apps"
        />
        <DashboardSingleNumberCard
          isLoading={isLoading}
          title="Denied"
          value={data.totalApplicationsDenied}
          variantColor={getBadgeVariantByStatus(LoanApplicationStatus.DENIED)}
          unit="Apps"
        />
      </div>

      <div className="flex gap-4 flex-wrap md:flex-nowrap mt-8">
        <LoanApplicationActivityChart />
        <LoanApplicationDecisionRateChart />
      </div>
    </div>
  )
}
