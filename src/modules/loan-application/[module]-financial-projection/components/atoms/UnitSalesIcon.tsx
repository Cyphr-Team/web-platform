import revenueTypeUnitSales from "@/assets/revenue-type-unit-sales.svg"
import revenueTypeUnitSalesBlack from "@/assets/revenue-type-unit-sales-black.svg"

import { cn } from "@/lib/utils.ts"

interface Props {
  className?: string
  variant?: "black" | "default"
}

export function UnitSalesIcon({ className, variant = "default" }: Props) {
  return (
    <img
      alt="file"
      className={cn("size-8", className)}
      src={
        variant === "default" ? revenueTypeUnitSales : revenueTypeUnitSalesBlack
      }
    />
  )
}
