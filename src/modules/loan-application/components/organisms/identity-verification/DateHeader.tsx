import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { format } from "date-fns"

export function DateHeader({ date }: { date?: string }) {
  return date ? (
    <div className="text-text-tertiary text-sm">
      Last updated on {date ? format(date, FORMAT_DATE_MM_DD_YYYY) : "N/A"}
    </div>
  ) : null
}
