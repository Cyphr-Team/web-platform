import {
  FORMAT_CHART_MONTHLY,
  FORMAT_CHART_WEEKLY,
  FORMAT_DATE_M_D_Y,
  FORMAT_DATE_M_D_Y_TIME,
  FORMAT_REQUEST_DATE
} from "@/constants/date.constants"
import { format } from "date-fns"

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
    console.error("Error with format request date")
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
