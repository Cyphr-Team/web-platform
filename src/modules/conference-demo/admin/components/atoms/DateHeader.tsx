import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { format } from "date-fns"

export const DateHeader = ({ updatedAt }: { updatedAt?: string }) => {
  if (!updatedAt) return null
  return (
    <div className="text-text-tertiary text-xs">
      Last updated on{" "}
      {updatedAt ? format(updatedAt, FORMAT_DATE_MM_DD_YYYY) : "N/A"}
    </div>
  )
}
