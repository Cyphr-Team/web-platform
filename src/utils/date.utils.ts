import {
  FORMAT_CHART_MONTHLY,
  FORMAT_CHART_WEEKLY,
  FORMAT_DATE_M_D_Y,
  FORMAT_DATE_M_D_Y_TIME,
  FORMAT_REQUEST_DATE
} from "@/constants/date.constants"
import { format, interval, isEqual, isValid, parse } from "date-fns"
import { util } from "zod"
import find = util.find

export const formatBirthday = (date?: string) => {
  try {
    return format(date ?? "", FORMAT_DATE_M_D_Y)
  } catch {
    return date
  }
}

export const formatDate = (date?: string) => {
  try {
    return format(date ?? "", FORMAT_DATE_M_D_Y_TIME)
  } catch {
    return date
  }
}

export const requestDate = (date?: string | Date) => {
  try {
    return format(date ?? "", FORMAT_REQUEST_DATE)
  } catch {
    return format(new Date(), FORMAT_REQUEST_DATE)
  }
}

export const formatChartMonthly = (date?: string | Date) => {
  try {
    return format(date ?? "", FORMAT_CHART_MONTHLY)
  } catch {
    return date?.toString() ?? ""
  }
}

export const formatChartWeekly = (date?: string | Date) => {
  try {
    return format(date ?? "", FORMAT_CHART_WEEKLY)
  } catch {
    return date?.toString() ?? ""
  }
}

export const calculateDaysUntilExpiration = (
  expirationDays: number,
  sentAt: string
) => {
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const sentDate = new Date(sentAt)
  const currentDate = new Date()

  // Calculate the number of days until expiration based on the difference between the current date and the sent date
  return (
    expirationDays -
    Math.floor(
      (currentDate.getTime() - sentDate.getTime()) / millisecondsPerDay
    )
  )
}

export const validTimeRange = (
  start: string | number | Date,
  end: string | number | Date
): boolean => {
  try {
    interval(start, end, { assertPositive: true })
    return true
  } catch (e) {
    return false
  }
}

export const validFormat = (value: string) => {
  const allowedFormat = ["MM/dd/yyyy", "MMM dd, yyyy", "MMM dd yyyy"]
  const newDate = new Date()
  return (
    find(
      allowedFormat.map((fmt) => isValid(parse(value, fmt, newDate))),
      (value) => value
    ) !== undefined
  )
}

export const isEqualDate = (date1: string, date2: string) => {
  try {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    return isEqual(d1, d2)
  } catch {
    return false
  }
}
