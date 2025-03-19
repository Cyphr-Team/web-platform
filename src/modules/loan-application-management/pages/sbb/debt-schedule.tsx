import { DebtScheduleTable } from "./debt-schedule-table"
import { AmortizationScheduleTable } from "./amortization-schedule-table"
import { Separator } from "@/components/ui/separator"

export function Component() {
  return (
    <div className="flex flex-col gap-6 ">
      <DebtScheduleTable />
      <Separator />
      <AmortizationScheduleTable />
    </div>
  )
}
