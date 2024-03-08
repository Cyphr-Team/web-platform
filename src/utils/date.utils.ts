import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants"
import { format } from "date-fns"

export const formatBirthday = (date?: string) => {
  try {
    return format(date ?? "", FORMAT_DATE_M_D_Y)
  } catch {
    return date
  }
}
