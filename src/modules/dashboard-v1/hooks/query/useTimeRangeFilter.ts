import { TimeRangeValue } from "@/types/time-range.type"
import { requestFromDate, requestToDate } from "@/utils/date.utils"
import { DashboardState } from "../../types/stats.types"

export const useTimeRangeFilter = ({ timeRange }: DashboardState["filter"]) => {
  const { from, to, selectedTimeRange } = timeRange

  if (!(from && to)) return { from: null, to: null }

  const timeRangeFilter = {
    from:
      selectedTimeRange === TimeRangeValue.ALL_TIME
        ? null
        : requestFromDate(from),
    to: selectedTimeRange === TimeRangeValue.ALL_TIME ? null : requestToDate(to)
  }

  return timeRangeFilter
}
