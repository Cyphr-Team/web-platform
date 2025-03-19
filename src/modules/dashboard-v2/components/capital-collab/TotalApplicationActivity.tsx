import { useDashboard } from "@/modules/dashboard-v2/providers/dashboard-provider"
import { DashboardSingleNumberCard } from "@/modules/dashboard-v2/components/atoms/DashboardSingleNumberCard"
import { CapitalCollabLoanApplicationActivityChart } from "./CCLoanApplicationActivityChart"
import { StatsTitle } from "../atoms/StatsTitle"
import { CapitalCollabLoanApplicationDecisionRateChart } from "./CCLoanApplicationDecisionRateChart"

import { CurrentUsage } from "../atoms/CurrentUsage"
import { type CCStatsResponse } from "../../types/stats.types"
import { CC_DASHBOARD_CARDS } from "../../constants/dashboard.constants"
import {
  getStatusDisplayName,
  getBadgeVariantByStatus
} from "@/modules/loan-application/capital-collab/services"

export function TotalApplicationActivity() {
  const { isLoadingCCStatsData, ccStatsData } = useDashboard()

  const data: Partial<CCStatsResponse> = ccStatsData ?? {}

  return (
    <div>
      <div className="flex flex-row justify-between items-center flex-wrap md:mb-0 mb-4">
        <StatsTitle>Application Activity</StatsTitle>
        <CurrentUsage minimal />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {CC_DASHBOARD_CARDS.map((card) => (
          <DashboardSingleNumberCard
            key={card.status}
            badgeProps={{ isDot: false }}
            isLoading={isLoadingCCStatsData}
            title={getStatusDisplayName(card.status)}
            unit=""
            value={data[card.valueMapping]}
            variantColor={getBadgeVariantByStatus(card.status)}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 md:flex-nowrap">
        <CapitalCollabLoanApplicationActivityChart />
        <CapitalCollabLoanApplicationDecisionRateChart />
      </div>
    </div>
  )
}
