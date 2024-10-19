import { cn } from "@/lib/utils"
import { toCurrency } from "@/utils"

interface OperatingExpensesDisplayProps {
  label: string
  description?: string
  value?: number
  className?: string
}

export function OperatingExpensesDisplay({
  label,
  description,
  value,
  className
}: OperatingExpensesDisplayProps) {
  return (
    <div className={cn(className, "gap-sm flex justify-between")}>
      <div className="flex flex-col">
        <div className="text-text-secondary font-medium text-sm">{label}</div>
        <p className="text-sm text-text-tertiary">{description}</p>
      </div>
      <p className="text-base">{toCurrency(value) ?? "N/A"} / mo</p>
    </div>
  )
}
