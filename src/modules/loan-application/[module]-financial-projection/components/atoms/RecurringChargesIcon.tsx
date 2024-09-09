import recurringChargesIcon from "@/assets/revenue-type-recurring-charges.svg"
import { cn } from "@/lib/utils.ts"

interface Props {
  className?: string
}

export const RecurringChargesIcon = ({ className }: Props) => {
  return (
    <img
      src={recurringChargesIcon}
      className={cn("w-8 h-8", className)}
      alt="file"
    />
  )
}
