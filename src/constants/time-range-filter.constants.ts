import { TimeRangeOption, TimeRangeValue } from "@/types/time-range.type"
import * as z from "zod"

const timeRangeOptions: TimeRangeOption[] = [
  { label: "Today", value: TimeRangeValue.TODAY },
  { label: "Yesterday", value: TimeRangeValue.YESTERDAY },
  { label: "This Week", value: TimeRangeValue.THIS_WEEK },
  { label: "Last Week", value: TimeRangeValue.LAST_WEEK },
  { label: "Last 7 Days", value: TimeRangeValue.LAST_7_DAYS },
  { label: "This Month", value: TimeRangeValue.THIS_MONTH },
  { label: "Last Month", value: TimeRangeValue.LAST_MONTH },
  { label: "Last 3 Months", value: TimeRangeValue.LAST_3_MONTHS },
  { label: "Last 6 Months", value: TimeRangeValue.LAST_6_MONTHS },
  { label: "Custom", value: TimeRangeValue.CUSTOM }
]

const TimeRangeFilterSchema = z.object({
  timeRange: z.object({
    selectedTimeRange: z.string(),
    from: z.string().min(1, "From date is required."),
    to: z.string().min(1, "To date is required.")
  })
})

export { timeRangeOptions, TimeRangeFilterSchema }
