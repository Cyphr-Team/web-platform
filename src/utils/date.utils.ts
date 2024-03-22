import {
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
