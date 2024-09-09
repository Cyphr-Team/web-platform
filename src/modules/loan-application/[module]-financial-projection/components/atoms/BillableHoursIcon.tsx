import billableHoursIcon from "@/assets/revenue-type-billable-hours.svg"
import { cn } from "@/lib/utils.ts"

interface Props {
  className?: string
}

export const BillableHoursIcon = ({ className }: Props) => {
  return (
    <img
      src={billableHoursIcon}
      className={cn("w-8 h-8", className)}
      alt="file"
    />
  )
}
