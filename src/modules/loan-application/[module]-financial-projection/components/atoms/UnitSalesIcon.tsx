import revenueTypeUnitSales from "@/assets/revenue-type-unit-sales.svg"
import revenueTypeUnitSalesBlack from "@/assets/revenue-type-unit-sales-black.svg"

import { cn } from "@/lib/utils.ts"

interface Props {
  className?: string
  variant?: "black" | "default"
}

export const UnitSalesIcon = ({ className, variant = "default" }: Props) => {
  return (
    <img
      src={
        variant === "default" ? revenueTypeUnitSales : revenueTypeUnitSalesBlack
      }
      className={cn("w-8 h-8", className)}
      alt="file"
    />
  )
}
