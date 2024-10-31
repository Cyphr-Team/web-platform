import { type ReactNode, useCallback } from "react"
import { UnitSalesIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/UnitSalesIcon.tsx"
import { BillableHoursIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/BillableHoursIcon.tsx"
import { RecurringChargesIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/RecurringChargesIcon.tsx"
import { ContractRevenueIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/ContractRevenueIcon.tsx"
import { Button } from "@/components/ui/button.tsx"
import { cn } from "@/lib/utils.ts"
import {
  type OnAddItemToField,
  type RevenueStream,
  RevenueType
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
  onAddItemToField: OnAddItemToField
}

export function RevenueTypeSelection(props: RevenueTypeSelectionProps) {
  const { onAddItemToField, counter } = props
  const { getValues } = useFormContext<RevenueStream>()

  const isSelected = useCallback(
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
        icon={<UnitSalesIcon />}
        selected={isSelected(RevenueType.UnitSales)}
        subtitle="Ideal for products sold as individual units or in specific quantities."
        title="Unit sales"
        onClick={onAddItemToField(RevenueType.UnitSales, emptyUnitSale)}
      />
      <RevenueTypeItem
        icon={<BillableHoursIcon />}
        selected={isSelected(RevenueType.BillableHours)}
        subtitle="Best for services charged on an hourly basis."
        title="Billable hours"
        onClick={onAddItemToField(RevenueType.BillableHours, emptyBillableHour)}
      />
      <RevenueTypeItem
        icon={<RecurringChargesIcon />}
        selected={isSelected(RevenueType.RecurringCharges)}
        subtitle="Perfect for subscriptions, memberships, rentals, or any service with periodic payments."
        title="Recurring charges"
        onClick={onAddItemToField(
          RevenueType.RecurringCharges,
          emptyRecurringCharge
        )}
      />
      <RevenueTypeItem
        icon={<ContractRevenueIcon />}
        selected={isSelected(RevenueType.Contracts)}
        subtitle="Suitable for contract revenue, or for entering total revenue without itemized details"
        title="Contract revenue"
        onClick={onAddItemToField(RevenueType.Contracts, emptyContract)}
      />
    </div>
  )
}

interface RevenueTypeItemProps {
  title: string
  icon: ReactNode
  subtitle: string
  onClick: VoidFunction
  selected?: boolean
}

function RevenueTypeItem(props: RevenueTypeItemProps) {
  const { title, icon, subtitle, onClick, selected = false } = props

  return (
    <Button
      className={cn(
        "col-span-1 flex text-wrap w-full justify-start flex-row gap-4 border border-dashed rounded-[8px] py-3 pl-4 pr-2 border-brand-primary-gray shadow-xl cursor-pointer hover:bg-transparent text-left",
        selected
          ? "select-none hover:bg-[#DBDBDB] bg-[#DBDBDB] disabled:text-text-caption border-opacity-40"
          : null,
        "h-[9rem] md:h-[7rem]"
      )}
      type="button"
      variant="outline"
      onClick={onClick}
    >
      <div className="min-w-8">{icon}</div>
      <div className="flex flex-col justify-center h-full gap-md">
        <div className={cn("font-semibold text-text-foreground")}>{title}</div>
        <div className={cn("text-text-caption font-normal")}>{subtitle}</div>
      </div>
    </Button>
  )
}
