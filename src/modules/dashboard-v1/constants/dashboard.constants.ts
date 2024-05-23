import { TimeRangeValue } from "@/types/time-range.type"
import { getTimeRangeDates } from "@/utils/time-range.utils"
import { DashboardState } from "../types/stats.types"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"

const QUERY_KEY = {
  INSTITUTION_ACTIVITY: "INSTITUTION_ACTIVITY",
  APPROVAL_RATE: "APPROVAL_RATE",
  INCOMPLETE_APPLICATION_RATE: "INCOMPLETE_APPLICATION_RATE",
  AVERAGE_TIME_TO_APPROVAL_METRICS: "AVERAGE_TIME_TO_APPROVAL_METRICS",
  AVERAGE_LOAN_SIZE: "AVERAGE_LOAN_SIZE",
  PORTFOLIO_GROWTH: "PORTFOLIO_GROWTH",
  INSTITUTION_USAGE: "INSTITUTION_USAGE"
}

const DEFAULT_DASHBOARD_STATE: DashboardState = {
  filter: {
    timeRange: {
      selectedTimeRange: TimeRangeValue.THIS_MONTH,
      ...getTimeRangeDates(TimeRangeValue.THIS_MONTH)
    }
  },
  approvalRateFrequency: GRAPH_FREQUENCY.MONTHLY,
  incompleteApplicationRateFrequency: GRAPH_FREQUENCY.MONTHLY,
  averageTimeToApprovalMetricsFrequency: GRAPH_FREQUENCY.MONTHLY,
  averageLoanSizeFrequency: GRAPH_FREQUENCY.MONTHLY,
  portfolioGrowthFrequency: GRAPH_FREQUENCY.MONTHLY
}

export { QUERY_KEY, DEFAULT_DASHBOARD_STATE }
