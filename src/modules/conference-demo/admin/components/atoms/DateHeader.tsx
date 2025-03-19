import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { format } from "date-fns"

export function DateHeader({ updatedAt }: { updatedAt?: string }) {
  if (!updatedAt) return null

  return (
    <div className="text-xs text-text-tertiary">
      Last updated on{" "}
      {updatedAt ? format(updatedAt, FORMAT_DATE_MM_DD_YYYY) : "N/A"}
    </div>
  )
}
