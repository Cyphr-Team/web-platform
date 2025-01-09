import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { DashboardSingleNumberCard } from "@/modules/dashboard-v2/components/atoms/DashboardSingleNumberCard"
import { StatsTitle } from "@/modules/dashboard-v2/components/atoms/StatsTitle"
import ChartCard from "@/shared/molecules/chart-card"
import ApplicationUsage from "../molecules/ApplicationUsage"
import {
  MOCK_APPLICATION_ACTIVITY,
  MOCK_INCOMPLETE_APPLICATION_RATE,
  MOCK_LOAN_APPLICATION_ACTIVITY
} from "../../constants/data"
import CHART_CONFIGS from "../../constants/chart-configs"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import IncompleteApplicationRateChart from "@/shared/organisms/charts/loan-application-decision-rate-chart"
import LoanApplicationActivityChart from "@/shared/organisms/charts/loan-application-activity-chart"

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
        <ChartCard className="w-full flex-1" title="Loan Application">
          <LoanApplicationActivityChart
            chartConfig={CHART_CONFIGS.loanApplicationActivity}
            data={MOCK_LOAN_APPLICATION_ACTIVITY}
            timePeriod={GRAPH_FREQUENCY.MONTHLY}
          />
        </ChartCard>
        <ChartCard title="Incomplete Application Rate">
          <IncompleteApplicationRateChart
            data={MOCK_INCOMPLETE_APPLICATION_RATE}
          />
        </ChartCard>
      </div>
    </div>
  )
}
