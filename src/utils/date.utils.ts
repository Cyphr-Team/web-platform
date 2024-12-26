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
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"

export const formatBirthday = (date?: string) => {
  try {
    return format(date ?? "", FORMAT_DATE_M_D_Y)
  } catch {
    return date
  }
}

export const formatDate = (
  date?: string,
  dateFormat: string = FORMAT_DATE_M_D_Y_TIME
) => {
  try {
    return format(date ?? "", dateFormat)
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

export const formatDateByTimePeriod = (
  value: string,
  timePeriod?: GRAPH_FREQUENCY
) =>
  timePeriod === GRAPH_FREQUENCY.WEEKLY
    ? formatChartWeekly(value)
    : formatChartMonthly(value)

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

// Check if string is in MM/YYYY format and is in the past
export const validFormatMMYYYY = (value: string) => {
  // Regular expression to match MM/YYYY format
  const regex = /^(0[1-9]|1[0-2])\/\d{4}$/

  // Check if the string matches the regex
  if (!regex.test(value)) return false

  const [month, year] = value.split("/").map(Number)

  // Get current year and month
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1 // months are zero-indexed

  // Check if the year is valid and not in the past
  if (year < currentYear || (year === currentYear && month <= currentMonth)) {
    return true
  }

  return false
}

export const parseMMYYYYToISOString = (mmyyyy: string) => {
  const [month, year] = mmyyyy.split("/").map(Number)

  return new Date(Date.UTC(year, month - 1)).toISOString()
}

export const parseISOStringToMMYYYY = (isoString: string) => {
  // Create a new Date object from the ISO string
  const dateObj = new Date(isoString)

  // Extract the day, month, and year
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0") // Months are 0-indexed
  const year = dateObj.getUTCFullYear()

  // Return the formatted date as DD/MM/YYYY
  return `${month}/${year}`
}

export const validFormat = (value: string) => {
  // Allowed ISO string
  const isoParsedDate = new Date(value)

  if (isValid(isoParsedDate) && !isNaN(isoParsedDate.getTime())) {
    return isoParsedDate
  }

  const allowedFormat = ["MM/dd/yyyy", "MMM dd, yyyy", "MMM dd yyyy", "MM/yyyy"]
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

export function formatToISOString(date: string, format = "MM/yyyy"): string {
  const isoParsedDate = new Date(date)

  if (isValid(isoParsedDate) && !isNaN(isoParsedDate.getTime())) {
    return isoParsedDate.toISOString()
  }

  const newDate = new Date()

  return parse(date, format, newDate).toISOString()
}

export function validDateWithinTimeRange(
  date: Date,
  fromDate?: Date,
  toDate?: Date,
  isEnableFutureDate?: boolean
) {
  const validFromDate = fromDate ? fromDate < date : true
  const validToDate = toDate ? date < toDate : true
  const validPastDate = date > new Date(1900, 0, 1)
  const validFutureDate = isEnableFutureDate ? true : date < new Date()

  return validFromDate && validToDate && validPastDate && validFutureDate
}
