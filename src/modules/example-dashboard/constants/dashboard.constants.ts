import { TimeRangeValue } from "@/types/time-range.type"
import { getTimeRangeDates } from "@/utils/time-range.utils"
import { DashboardState } from "../types/stats.types"

const QUERY_KEY = {
  INSTITUTION_ACTIVITY: "INSTITUTION_ACTIVITY"
}

const DEFAULT_DASHBOARD_STATE: DashboardState = {
  filter: {
    timeRange: {
      selectedTimeRange: TimeRangeValue.LAST_6_MONTHS,
      ...getTimeRangeDates(TimeRangeValue.LAST_6_MONTHS)
    }
  }
}

export { QUERY_KEY, DEFAULT_DASHBOARD_STATE }
