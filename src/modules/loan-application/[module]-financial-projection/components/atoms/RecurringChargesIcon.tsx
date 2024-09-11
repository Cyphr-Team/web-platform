import recurringChargesIcon from "@/assets/revenue-type-recurring-charges.svg"
import recurringChargesIconBlack from "@/assets/revenue-type-recurring-charges-black.svg"

import { cn } from "@/lib/utils.ts"

interface Props {
  className?: string
  variant?: "default" | "black"
}

export const RecurringChargesIcon = ({
  className,
  variant = "default"
}: Props) => {
  return (
    <img
      src={
        variant === "default" ? recurringChargesIcon : recurringChargesIconBlack
      }
      className={cn("w-8 h-8", className)}
      alt="file"
    />
  )
}
