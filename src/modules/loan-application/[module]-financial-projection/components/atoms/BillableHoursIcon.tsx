import billableHoursIcon from "@/assets/revenue-type-billable-hours.svg"
import billableHoursIconBlack from "@/assets/revenue-type-billable-hours-black.svg"

import { cn } from "@/lib/utils.ts"

interface Props {
  className?: string
  variant?: "default" | "black"
}

export function BillableHoursIcon({ className, variant = "default" }: Props) {
  return (
    <img
      alt="file"
      className={cn("size-8", className)}
      src={variant === "default" ? billableHoursIcon : billableHoursIconBlack}
    />
  )
}
