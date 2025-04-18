import { type TimeRangeFilterSchema } from "@/constants/time-range-filter.constants"
import type * as z from "zod"

enum TimeRangeValue {
  TODAY = "today",
  YESTERDAY = "yesterday",
  THIS_WEEK = "this_week",
  LAST_WEEK = "last_week",
  LAST_7_DAYS = "last_7_days",
  THIS_MONTH = "this_month",
  LAST_MONTH = "last_month",
  LAST_3_MONTHS = "last_3_months",
  LAST_6_MONTHS = "last_6_months",
  LAST_12_MONTHS = "last_12_months",
  LAST_YEAR = "last_year",
  ALL_TIME = "all_time",
  CUSTOM = "custom"
}

export { TimeRangeValue }

interface TimeRangeOption {
  label: string
  value: TimeRangeValue
}

interface TimeRangeSelectProps {
  options: TimeRangeOption[]
  onSelect: (selectedOption: TimeRangeOption) => void
}

type TimeRangeFilterValue = z.infer<typeof TimeRangeFilterSchema>

/**
 * String with date format - YYYY-mm-dd (FORMAT_REQUEST_DATE)
 */
interface TimeRange {
  from: string
  to: string
}

export type {
  TimeRange,
  TimeRangeSelectProps,
  TimeRangeOption,
  TimeRangeFilterValue
}
