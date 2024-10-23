import { type ReactNode, useCallback } from "react"
import { UnitSalesIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/UnitSalesIcon.tsx"
import { BillableHoursIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/BillableHoursIcon.tsx"
import { RecurringChargesIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/RecurringChargesIcon.tsx"
import { ContractRevenueIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/ContractRevenueIcon.tsx"
import { Button } from "@/components/ui/button.tsx"
import { cn } from "@/lib/utils.ts"
import {
  type BillableHour,
  type Contract,
  type RecurringCharge,
  type RevenueStream,
  RevenueType,
  type UnitSale
} from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { useFormContext } from "react-hook-form"
import {
  emptyBillableHour,
  emptyContract,
  emptyRecurringCharge,
  emptyUnitSale
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-revenue-store.ts"

interface RevenueTypeSelectionProps {
  counter?: { [key in RevenueType]: boolean }
  onAddItemToField: (
    type: RevenueType,
    data: UnitSale | BillableHour | RecurringCharge | Contract
  ) => VoidFunction
}

export function RevenueTypeSelection(props: RevenueTypeSelectionProps) {
  const { onAddItemToField, counter } = props
  const { getValues } = useFormContext<RevenueStream>()

  const isDisable = useCallback(
    (type: RevenueType): boolean => {
      if (!counter) {
        return getValues(type).length > 0
      }

      return counter[type] || getValues(type).length > 0
    },
    [counter, getValues]
  )

  return (
    <div className="grid grid-cols-2 w-full gap-2xl py-5">
      <RevenueTypeItem
        disable={isDisable(RevenueType.UNIT_SALES)}
        icon={<UnitSalesIcon />}
        subtitle="Ideal for products sold as individual units or in specific quantities."
        title="Unit sales"
        onClick={onAddItemToField(RevenueType.UNIT_SALES, emptyUnitSale)}
      />
      <RevenueTypeItem
        disable={isDisable(RevenueType.BILLABLE_HOURS)}
        icon={<BillableHoursIcon />}
        subtitle="Best for services charged on an hourly basis."
        title="Billable hours"
        onClick={onAddItemToField(
          RevenueType.BILLABLE_HOURS,
          emptyBillableHour
        )}
      />
      <RevenueTypeItem
        disable={isDisable(RevenueType.RECURRING_CHARGES)}
        icon={<RecurringChargesIcon />}
        subtitle="Perfect for subscriptions, memberships, rentals, or any service with periodic payments."
        title="Recurring charges"
        onClick={onAddItemToField(
          RevenueType.RECURRING_CHARGES,
          emptyRecurringCharge
        )}
      />
      <RevenueTypeItem
        disable={isDisable(RevenueType.CONTRACTS)}
        icon={<ContractRevenueIcon />}
        subtitle="Suitable for contract revenue, or for entering total revenue without itemized details"
        title="Contract revenue"
        onClick={onAddItemToField(RevenueType.CONTRACTS, emptyContract)}
      />
    </div>
  )
}

interface RevenueTypeItemProps {
  title: string
  icon: ReactNode
  subtitle: string
  onClick: VoidFunction
  disable?: boolean
}

function RevenueTypeItem(props: RevenueTypeItemProps) {
  const { title, icon, subtitle, onClick, disable = false } = props

  return (
    <Button
      className={cn(
        "col-span-1 flex text-wrap w-full justify-start flex-row gap-4 border border-dashed rounded-[8px] p-4 border-brand-primary-gray shadow-xl cursor-pointer hover:bg-[#DBDBDBA6] text-left",
        disable ? "select-none bg-[#DBDBDB] disabled:text-text-caption" : null,
        "h-[9rem] md:h-[7rem]"
      )}
      disabled={disable}
      type="button"
      variant="outline"
      onClick={onClick}
    >
      <div className="min-w-8">{icon}</div>
      <div className="flex flex-col justify-start h-full gap-md">
        <div className={cn("font-semibold text-text-foreground")}>{title}</div>
        <div className={cn("text-text-caption font-normal")}>{subtitle}</div>
      </div>
    </Button>
  )
}
