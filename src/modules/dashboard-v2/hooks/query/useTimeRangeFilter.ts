import { requestDate } from "@/utils/date.utils"
import { type DashboardState } from "../../types/stats.types"
import { TimeRangeValue } from "@/types/time-range.type"

export const useTimeRangeFilter = ({ timeRange }: DashboardState["filter"]) => {
  const { from, to, selectedTimeRange } = timeRange

  const timeRangeFilter = {
    from:
      selectedTimeRange === TimeRangeValue.ALL_TIME ? null : requestDate(from),
    to: selectedTimeRange === TimeRangeValue.ALL_TIME ? null : requestDate(to)
  }

  return timeRangeFilter
}
