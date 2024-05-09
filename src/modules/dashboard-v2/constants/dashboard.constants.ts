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
  INSTITUTION_USAGE: "INSTITUTION_USAGE",
  AGGREGATE_ARPPOVED_LOAN_AMOUNT: "AGGREGATE_ARPPOVED_LOAN_AMOUNT",
  AVERAGE_APPROVAL_RATE: "AVERAGE_APPROVAL_RATE"
}

const DEFAULT_DASHBOARD_STATE: DashboardState = {
  filter: {
    timeRange: {
      selectedTimeRange: TimeRangeValue.LAST_3_MONTHS,
      ...getTimeRangeDates(TimeRangeValue.LAST_3_MONTHS)
    }
  },
  approvalRateFrequency: GRAPH_FREQUENCY.MONTHLY,
  incompleteApplicationRateFrequency: GRAPH_FREQUENCY.MONTHLY,
  averageTimeToApprovalMetricsFrequency: GRAPH_FREQUENCY.MONTHLY,
  averageLoanSizeFrequency: GRAPH_FREQUENCY.MONTHLY,
  portfolioGrowthFrequency: GRAPH_FREQUENCY.MONTHLY,
  loanProgramIds: []
}

const LABEL_CONFIG = {
  fontSize: 12,
  position: "top",
  fontWeight: "500",
  fill: "black"
} as const

const CARTESIAN_GRID = {
  strokeDasharray: "3 3",
  vertical: false
}

const CHART_DEFAULT = {
  fontSize: 12,
  submittedColor: "#4A86E8",
  closedColor: "#000000",
  deniedColor: "#EA4335",
  approvedColor: "#34A853",
  inreviewColor: "#FBBC04",
  draftColor: "#B3B3B3",
  draftLineColor: "#B3B3B3",
  approvalLineColor: "#34A853",
  deniedLineColor: "#EA4335"
}

export {
  QUERY_KEY,
  DEFAULT_DASHBOARD_STATE,
  LABEL_CONFIG,
  CARTESIAN_GRID,
  CHART_DEFAULT
}
