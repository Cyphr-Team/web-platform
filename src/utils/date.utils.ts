import {
  FORMAT_DATE_M_D_Y,
  FORMAT_DATE_M_D_Y_TIME
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
