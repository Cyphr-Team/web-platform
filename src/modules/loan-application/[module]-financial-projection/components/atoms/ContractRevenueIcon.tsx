import contractRevenue from "@/assets/revenue-type-contract-revenue.svg"
import { cn } from "@/lib/utils.ts"

interface Props {
  className?: string
}

export function ContractRevenueIcon({ className }: Props) {
  return (
    <img
      alt="file"
      className={cn("w-8 h-8", className)}
      src={contractRevenue}
    />
  )
}
