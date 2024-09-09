import revenueTypeUnitSales from "@/assets/revenue-type-unit-sales.svg"
import { cn } from "@/lib/utils.ts"

interface Props {
  className?: string
}

export const UnitSalesIcon = ({ className }: Props) => {
  return (
    <img
      src={revenueTypeUnitSales}
      className={cn("w-8 h-8", className)}
      alt="file"
    />
  )
}
