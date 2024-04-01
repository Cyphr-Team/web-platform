import { TimeRangeValue } from "@/types/time-range.type"
import { getTimeRangeDates } from "@/utils/time-range.utils"
import { DashboardState } from "../types/stats.types"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"

const QUERY_KEY = {
  INSTITUTION_ACTIVITY: "INSTITUTION_ACTIVITY",
  APPROVAL_RATE: "APPROVAL_RATE",
  INCOMPLETE_APPLICATION_RATE: "INCOMPLETE_APPLICATION_RATE",
  AVERAGE_TIME_TO_APPROVAL_METRICS: "AVERAGE_TIME_TO_APPROVAL_METRICS"
}

const DEFAULT_DASHBOARD_STATE: DashboardState = {
  filter: {
    timeRange: {
      selectedTimeRange: TimeRangeValue.LAST_6_MONTHS,
      ...getTimeRangeDates(TimeRangeValue.LAST_6_MONTHS)
    }
  },
  approvalRateFrequency: GRAPH_FREQUENCY.MONTHLY,
  incompleteApplicationRateFrequency: GRAPH_FREQUENCY.MONTHLY,
  averageTimeToApprovalMetricsFrequency: GRAPH_FREQUENCY.MONTHLY
}

export { QUERY_KEY, DEFAULT_DASHBOARD_STATE }
