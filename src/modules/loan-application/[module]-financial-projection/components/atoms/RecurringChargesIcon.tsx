import recurringChargesIcon from "@/assets/revenue-type-recurring-charges.svg"
import recurringChargesIconBlack from "@/assets/revenue-type-recurring-charges-black.svg"

import { cn } from "@/lib/utils.ts"

interface RecurringChargesIconProps {
  className?: string
  variant?: "default" | "black"
}

export function RecurringChargesIcon({
  className,
  variant = "default"
}: RecurringChargesIconProps) {
  return (
    <img
      alt="file"
      className={cn("w-8 h-8", className)}
      src={
        variant === "default" ? recurringChargesIcon : recurringChargesIconBlack
      }
    />
  )
}
