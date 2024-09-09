import contractRevenue from "@/assets/revenue-type-contract-revenue.svg"
import { cn } from "@/lib/utils.ts"

interface Props {
  className?: string
}

export const ContractRevenueIcon = ({ className }: Props) => {
  return (
    <img
      src={contractRevenue}
      className={cn("w-8 h-8", className)}
      alt="file"
    />
  )
}
