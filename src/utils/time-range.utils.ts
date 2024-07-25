import { TimeRangeValue } from "@/types/time-range.type"
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears
} from "date-fns"

const getTimeRangeDates = (timeRange: TimeRangeValue) => {
  try {
    const now = new Date()

    let from: Date
    let to: Date = now

    switch (timeRange) {
      case TimeRangeValue.TODAY:
        from = startOfDay(now)
        break
      case TimeRangeValue.YESTERDAY:
        from = startOfDay(subDays(now, 1))
        to = endOfDay(subDays(now, 1))
        break
      case TimeRangeValue.THIS_WEEK:
        from = startOfWeek(now)
        break
      case TimeRangeValue.LAST_WEEK:
        from = startOfWeek(subWeeks(now, 1))
        to = endOfWeek(subWeeks(now, 1))
        break
      case TimeRangeValue.LAST_7_DAYS:
        from = startOfDay(subDays(now, 6))
        break
      case TimeRangeValue.THIS_MONTH:
        from = startOfMonth(now)
        break
      case TimeRangeValue.LAST_MONTH:
        from = startOfMonth(subMonths(now, 1))
        to = endOfMonth(subMonths(now, 1))
        break
      case TimeRangeValue.LAST_3_MONTHS:
        from = startOfMonth(subMonths(now, 3))
        to = endOfMonth(subMonths(now, 1))
        break
      case TimeRangeValue.LAST_6_MONTHS:
        from = startOfMonth(subMonths(now, 6))
        to = endOfMonth(subMonths(now, 1))
        break
      case TimeRangeValue.LAST_12_MONTHS:
        from = startOfMonth(subMonths(now, 12))
        to = endOfMonth(subMonths(now, 1))
        break
      case TimeRangeValue.LAST_YEAR:
        from = startOfYear(subYears(now, 1))
        to = endOfYear(subYears(now, 1))
        break
      case TimeRangeValue.ALL_TIME:
        from = startOfYear(1970)
        break
      default:
        throw new Error("Invalid time range value")
    }

    return { from, to }
  } catch {
    return { from: new Date(), to: new Date() }
  }
}

export { getTimeRangeDates }
