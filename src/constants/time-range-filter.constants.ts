import { type TimeRangeOption, TimeRangeValue } from "@/types/time-range.type"
import * as z from "zod"

// Comment out some options because it's not used yet
// We limit the time range only 3 months from now

const timeRangeOptions: TimeRangeOption[] = [
  // { label: "All time", value: TimeRangeValue.ALL_TIME },
  // { label: "Today", value: TimeRangeValue.TODAY },
  // { label: "Yesterday", value: TimeRangeValue.YESTERDAY },
  // { label: "This week", value: TimeRangeValue.THIS_WEEK },
  // { label: "Last week", value: TimeRangeValue.LAST_WEEK },
  // { label: "Last 7 days", value: TimeRangeValue.LAST_7_DAYS },
  { label: "This month", value: TimeRangeValue.THIS_MONTH },
  { label: "Last month", value: TimeRangeValue.LAST_MONTH },
  { label: "Last 3 months", value: TimeRangeValue.LAST_3_MONTHS },
  // { label: "Last 6 Months", value: TimeRangeValue.LAST_6_MONTHS },
  // { label: "Last Year", value: TimeRangeValue.LAST_YEAR },
  { label: "Custom", value: TimeRangeValue.CUSTOM }
]

const timeRangeExtendedOptions: TimeRangeOption[] = [
  { label: "This month", value: TimeRangeValue.THIS_MONTH },
  { label: "Last month", value: TimeRangeValue.LAST_MONTH },
  { label: "Last 3 months", value: TimeRangeValue.LAST_3_MONTHS },
  { label: "Last 6 Months", value: TimeRangeValue.LAST_6_MONTHS },
  { label: "Last 12 Months", value: TimeRangeValue.LAST_12_MONTHS },
  { label: "Custom", value: TimeRangeValue.CUSTOM }
]

const TimeRangeFilterSchema = z.object({
  timeRange: z.object({
    selectedTimeRange: z.string().optional(),
    from: z.date().optional(),
    to: z.date().optional()
  })
})

export { timeRangeOptions, timeRangeExtendedOptions, TimeRangeFilterSchema }
