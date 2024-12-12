import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { DashboardSingleNumberCard } from "@/modules/dashboard-v2/components/atoms/DashboardSingleNumberCard"
import { StatsTitle } from "@/modules/dashboard-v2/components/atoms/StatsTitle"
import ChartCard from "./ChartCard"
import { LoanApplicationActivityChart } from "../molecules/charts/LoanApplicationActivityChart"
import { IncompleteApplicationRateChart } from "../molecules/charts/IncompleteAppicationRateChart"
import ApplicationUsage from "../molecules/ApplicationUsage"
import { MOCK_APPLICATION_ACTIVITY } from "../../constants/data"

export function TotalApplicationActivity() {
  const isLoading = false
  const data = MOCK_APPLICATION_ACTIVITY

  return (
    <div>
      <div className="flex flex-row justify-between items-center flex-wrap md:mb-0 mb-4">
        <StatsTitle>Application Activity</StatsTitle>
        <ApplicationUsage />
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <ChartCard title="Loan Application">
          <LoanApplicationActivityChart />
        </ChartCard>
        <ChartCard title="Incomplete Application Rate">
          <IncompleteApplicationRateChart />
        </ChartCard>
      </div>
    </div>
  )
}
