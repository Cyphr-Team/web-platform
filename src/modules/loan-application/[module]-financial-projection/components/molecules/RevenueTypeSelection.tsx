import { ReactNode, useCallback } from "react"
import { UnitSalesIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/UnitSalesIcon.tsx"
import { BillableHoursIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/BillableHoursIcon.tsx"
import { RecurringChargesIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/RecurringChargesIcon.tsx"
import { ContractRevenueIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/ContractRevenueIcon.tsx"
import { Button } from "@/components/ui/button.tsx"
import { cn } from "@/lib/utils.ts"
import {
  BillableHour,
  Contract,
  emptyBillableHour,
  emptyContract,
  emptyRecurringCharge,
  emptyUnitSale,
  RecurringCharge,
  RevenueStream,
  RevenueType,
  UnitSale
} from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { useFormContext } from "react-hook-form"

interface RevenueTypeSelectionProps {
  counter?: { [key in RevenueType]: boolean }
  onAddItemToField: (
    type: RevenueType,
    data: UnitSale | BillableHour | RecurringCharge | Contract
  ) => VoidFunction
}

export const RevenueTypeSelection = (props: RevenueTypeSelectionProps) => {
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
        icon={<UnitSalesIcon />}
        title="Unit sales"
        subtitle="Ideal for products sold as individual units or in specific quantities."
        disable={isDisable(RevenueType.UNIT_SALES)}
        onClick={onAddItemToField(RevenueType.UNIT_SALES, emptyUnitSale)}
      />
      <RevenueTypeItem
        icon={<BillableHoursIcon />}
        title="Billable Hours"
        subtitle="Best for services charged on an hourly basis."
        disable={isDisable(RevenueType.BILLABLE_HOURS)}
        onClick={onAddItemToField(
          RevenueType.BILLABLE_HOURS,
          emptyBillableHour
        )}
      />
      <RevenueTypeItem
        icon={<RecurringChargesIcon />}
        title="Recurring charges"
        subtitle="Perfect for subscriptions, memberships, rentals, or any service with periodic payments."
        disable={isDisable(RevenueType.RECURRING_CHARGES)}
        onClick={onAddItemToField(
          RevenueType.RECURRING_CHARGES,
          emptyRecurringCharge
        )}
      />
      <RevenueTypeItem
        icon={<ContractRevenueIcon />}
        title="Contract Revenue"
        subtitle="Suitable for contract revenue, or for entering total revenue without itemized details"
        disable={isDisable(RevenueType.CONTRACTS)}
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

const RevenueTypeItem = (props: RevenueTypeItemProps) => {
  const { title, icon, subtitle, onClick, disable = false } = props

  return (
    <Button
      onClick={onClick}
      variant="outline"
      type="button"
      className={cn(
        "col-span-1 flex text-wrap w-full h-full flex-row gap-4 border border-dashed rounded-[8px] p-4 border-brand-primary-gray shadow-xl cursor-pointer hover:bg-[#DBDBDBA6] text-left",
        disable ? "select-none bg-[#DBDBDB] disabled:text-text-caption" : null
      )}
      disabled={disable}
    >
      <div className="min-w-8">{icon}</div>
      <div className="flex flex-col justify-start h-full gap-md">
        <div className={cn("font-semibold text-text-foreground")}>{title}</div>
        <div className={cn("text-text-caption font-normal")}>{subtitle}</div>
      </div>
    </Button>
  )
}
