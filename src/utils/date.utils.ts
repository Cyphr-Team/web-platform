import {
  FORMAT_CHART_MONTHLY,
  FORMAT_CHART_WEEKLY,
  FORMAT_DATE_M_D_Y,
  FORMAT_DATE_M_D_Y_TIME,
  FORMAT_REQUEST_DATE
} from "@/constants/date.constants"
import { addMinutes, format, interval, isEqual, isValid, parse } from "date-fns"
import { util } from "zod"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import find = util.find

/**
 * Formats a given Date object into a string with the pattern `MM/DD/YYYY | hh:mm A UTC` in UTC time.
 *
 * - If `customDate` is provided, it formats that date in UTC.
 * - If `customDate` is not provided, it formats the current date in UTC.
 * - Ensures two-digit formatting for month and day.
 * - Uses 12-hour format with AM/PM notation.
 *
 * @param {Date} [customDate] - An optional Date object to format.
 * @returns {string} - The formatted date string in `MM/DD/YYYY | hh:mm A UTC` format.
 */
export const formatPDFDate = (customDate?: Date): string => {
  const d = customDate || new Date()

  const month = (d.getUTCMonth() + 1).toString().padStart(2, "0") // Ensure 2-digit month
  const day = d.getUTCDate().toString().padStart(2, "0") // Ensure 2-digit day
  const year = d.getUTCFullYear()

  let hours = d.getUTCHours()
  const minutes = d.getUTCMinutes().toString().padStart(2, "0")
  const period = hours >= 12 ? "PM" : "AM"

  hours = hours % 12 || 12 // Convert 0 -> 12 for 12-hour format

  return `Signed Timestamp: ${month}/${day}/${year} | ${hours}:${minutes} ${period} UTC`
}

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
    const localDate = new Date(date ?? "")
    const timeZoneOffset = localDate.getTimezoneOffset()
    const timeZoneDate = addMinutes(localDate, timeZoneOffset)

    return format(timeZoneDate, FORMAT_CHART_MONTHLY)
  } catch {
    return date?.toString() ?? ""
  }
}

export const formatChartWeekly = (date?: string | Date) => {
  try {
    const localDate = new Date(date ?? "")
    const timeZoneOffset = localDate.getTimezoneOffset()
    const timeZoneDate = addMinutes(localDate, timeZoneOffset)

    return format(timeZoneDate, FORMAT_CHART_WEEKLY)
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

// Convert date from mm/dd/yyyy to yyyy-mm-dd
export const convertDate = (input: string): string => {
  const [month, day, year] = input.split("/")

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}

/**
 * Gets the first day of the current month based on the provided date string.
 *
 * This function takes a date string in the format "yyyy-mm-dd", validates it,
 * and returns the first day of the month as a string in the same "yyyy-mm-dd" format.
 * If the input date is invalid, it returns a placeholder string "---".
 *
 * @param {string} dateString - The input date string in the "yyyy-mm-dd" format.
 * @returns {string} The first day of the current month in "yyyy-mm-dd" format, or "---" if the input is invalid.
 *
 * @example
 * getFirstDayOfCurrentMonth("2024-01-15")
 * // Returns "2024-01-01"
 *
 * @example
 * getFirstDayOfCurrentMonth("invalid-date")
 * // Returns "---" for invalid date
 */
export const getFirstDayOfCurrentMonth = (dateString: string): string => {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) return "---"
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)

  return `${firstDay.getFullYear()}-${(firstDay.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${firstDay.getDate().toString().padStart(2, "0")}`
}

/**
 * Gets the last day of the previous month based on the provided date string.
 *
 * This function takes a date string in the format "yyyy-mm-dd", validates it,
 * and returns the last day of the previous month as a string in the same "yyyy-mm-dd" format.
 * If the input date is invalid, it returns a placeholder string "---".
 *
 * @param {string} dateString - The input date string in the "yyyy-mm-dd" format.
 * @returns {string} The last day of the previous month in "yyyy-mm-dd" format, or "---" if the input is invalid.
 *
 * @example
 * getLastDayOfPreviousMonth("2024-01-15")
 * // Returns "2023-12-31"
 *
 * @example
 * getLastDayOfPreviousMonth("invalid-date")
 * // Returns "---" for invalid date
 */
export const getLastDayOfPreviousMonth = (dateString: string): string => {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) return "---"
  const lastDay = new Date(date.getFullYear(), date.getMonth(), 0)

  return `${lastDay.getFullYear()}-${(lastDay.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${lastDay.getDate().toString().padStart(2, "0")}`
}
