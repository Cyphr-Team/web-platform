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
    <div className="grid w-full grid-cols-2 gap-2xl py-5">
      <RevenueTypeItem
        icon={<UnitSalesIcon />}
        selected={isSelected(RevenueType.UnitSales)}
        subtitle="Ideal for products sold as individual units or in specific quantities."
        title="Unit Sales"
        onClick={onAddItemToField(RevenueType.UnitSales, emptyUnitSale)}
      />
      <RevenueTypeItem
        icon={<BillableHoursIcon />}
        selected={isSelected(RevenueType.BillableHours)}
        subtitle="Best for services charged on an hourly basis."
        title="Billable Hours"
        onClick={onAddItemToField(RevenueType.BillableHours, emptyBillableHour)}
      />
      <RevenueTypeItem
        icon={<RecurringChargesIcon />}
        selected={isSelected(RevenueType.RecurringCharges)}
        subtitle="Perfect for subscriptions, memberships, rentals, or any service with periodic payments."
        title="Recurring Charges"
        onClick={onAddItemToField(
          RevenueType.RecurringCharges,
          emptyRecurringCharge
        )}
      />
      <RevenueTypeItem
        icon={<ContractRevenueIcon />}
        selected={isSelected(RevenueType.Contracts)}
        subtitle="Suitable for contract revenue, or for entering total revenue without itemized details."
        title="Contract Revenue"
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
        "col-span-1 flex w-full cursor-pointer flex-row justify-start gap-4 text-wrap rounded-[8px] border border-dashed border-brand-primary-gray py-3 pl-4 pr-2 text-left shadow-xl hover:bg-transparent",
        selected
          ? "select-none border-opacity-40 bg-[#DBDBDB] hover:bg-[#DBDBDB] disabled:text-text-caption"
          : null,
        "h-36 md:h-28"
      )}
      type="button"
      variant="outline"
      onClick={onClick}
    >
      <div className="min-w-8">{icon}</div>
      <div className="flex h-full flex-col justify-center gap-md">
        <div className={cn("font-semibold text-text-foreground")}>{title}</div>
        <div className={cn("font-normal text-text-caption")}>{subtitle}</div>
      </div>
    </Button>
  )
}
