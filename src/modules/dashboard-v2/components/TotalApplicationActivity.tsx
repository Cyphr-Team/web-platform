import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardSingleNumberCard } from "./atoms/DashboardSingleNumberCard"
import { LoanApplicationActivityChart } from "./LoanApplicationActivityChart"
import { CapitalCollabLoanApplicationActivityChart } from "./capital-collab-charts/CCLoanApplicationActivityChart"
import { StatsTitle } from "./atoms/StatsTitle"
import { LoanApplicationDecisionRateChart } from "./LoanApplicationDecisionRateChart"
import { CapitalCollabLoanApplicationDecisionRateChart } from "./capital-collab-charts/CCLoanApplicationDecisionRateChart"

import { isCapitalCollab } from "@/utils/domain.utils"
import { CurrentUsage } from "./atoms/CurrentUsage"
import { checkIsWorkspaceAdmin } from "@/utils/check-roles"

export function TotalApplicationActivity() {
  const { isLoading, statsData } = useDashboard()
  const isLenderAdmin = checkIsWorkspaceAdmin()

  const data = {
    totalApplicationsSubmitted: statsData?.totalApplicationSubmitted,
    totalApplicationsInReview: statsData?.totalApplicationInReview,
    totalApplicationsDenied: statsData?.totalApplicationDenied,
    totalApplicationsApproved: statsData?.totalApplicationApproved
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center flex-wrap md:mb-0 mb-4">
        <StatsTitle>Application Activity</StatsTitle>
        {isCapitalCollab() && isLenderAdmin ? <CurrentUsage minimal /> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardSingleNumberCard
          isLoading={isLoading}
          title="Submitted"
          unit="Apps"
          value={data.totalApplicationsSubmitted}
          variantColor={getBadgeVariantByStatus(
            LoanApplicationStatus.SUBMITTED
          )}
        />
        <DashboardSingleNumberCard
          isLoading={isLoading}
          title="In Review"
          unit="Apps"
          value={data.totalApplicationsInReview}
          variantColor={getBadgeVariantByStatus(
            LoanApplicationStatus.IN_REVIEW
          )}
        />
        <DashboardSingleNumberCard
          isLoading={isLoading}
          title="Approved"
          unit="Apps"
          value={data.totalApplicationsApproved}
          variantColor={getBadgeVariantByStatus(LoanApplicationStatus.APPROVED)}
        />
        <DashboardSingleNumberCard
          isLoading={isLoading}
          title="Denied"
          unit="Apps"
          value={data.totalApplicationsDenied}
          variantColor={getBadgeVariantByStatus(LoanApplicationStatus.DENIED)}
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-4 md:flex-nowrap">
        {isCapitalCollab() ? (
          <>
            <CapitalCollabLoanApplicationActivityChart />
            <CapitalCollabLoanApplicationDecisionRateChart />
          </>
        ) : (
          <>
            <LoanApplicationActivityChart />
            <LoanApplicationDecisionRateChart />
          </>
        )}
      </div>
    </div>
  )
}
