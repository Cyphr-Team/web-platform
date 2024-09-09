import { Dispatch, ReactNode, SetStateAction, useCallback } from "react"
import { UnitSalesIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/UnitSalesIcon.tsx"
import { BillableHoursIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/BillableHoursIcon.tsx"
import { RecurringChargesIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/RecurringChargesIcon.tsx"
import { ContractRevenueIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/ContractRevenueIcon.tsx"
import { Button } from "@/components/ui/button.tsx"
import { cn } from "@/lib/utils.ts"
import { RevenueType } from "@/modules/loan-application/[module]-financial-projection/components/organisms/RevenueForm.tsx"

interface RevenueTypeSelectionProps {
  currentFormType: RevenueType[]
  setCurrentFormType: Dispatch<SetStateAction<RevenueType[]>>
}

export const RevenueTypeSelection = (props: RevenueTypeSelectionProps) => {
  const { currentFormType, setCurrentFormType } = props

  const toggleRevenueType = useCallback(
    (type: RevenueType) => () => {
      setCurrentFormType((prevFormType) => {
        if (prevFormType.includes(type)) {
          // Remove the type if it's already in the array
          return prevFormType.filter((t) => t !== type)
        } else {
          // Add the type if it's not in the array
          return [...prevFormType, type]
        }
      })
    },
    [setCurrentFormType]
  )

  const isContain = useCallback(
    (type: RevenueType) => {
      return currentFormType.find((value) => value === type) !== undefined
    },
    [currentFormType]
  )

  return (
    <div className="grid grid-cols-2 w-full gap-2xl py-5">
      <RevenueTypeItem
        icon={<UnitSalesIcon />}
        title="Unit sales"
        subtitle="Ideal for products sold as individual units or in specific quantities."
        onClick={toggleRevenueType(RevenueType.UNIT_SALES)}
        disable={isContain(RevenueType.UNIT_SALES)}
      />
      <RevenueTypeItem
        icon={<BillableHoursIcon />}
        title="Billable Hours"
        subtitle="Best for services charged on an hourly basis."
        onClick={toggleRevenueType(RevenueType.BILLABLE_HOURS)}
        disable={isContain(RevenueType.BILLABLE_HOURS)}
      />
      <RevenueTypeItem
        icon={<RecurringChargesIcon />}
        title="Recurring charges"
        subtitle="Perfect for subscriptions, memberships, rentals, or any service with periodic payments."
        onClick={toggleRevenueType(RevenueType.RECURRING_CHARGES)}
        disable={isContain(RevenueType.RECURRING_CHARGES)}
      />
      <RevenueTypeItem
        icon={<ContractRevenueIcon />}
        title="Contract Revenue"
        subtitle="Suitable for contract revenue, or for entering total revenue without itemized details"
        onClick={toggleRevenueType(RevenueType.CONTRACT_REVENUE)}
        disable={isContain(RevenueType.CONTRACT_REVENUE)}
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
        disable ? "select-none bg-[#DBDBDBA6]" : null
      )}
    >
      <div className="min-w-8">{icon}</div>
      <div className="flex flex-col justify-start h-full gap-md">
        <div
          className={cn(
            "font-semibold text-text-foreground",
            disable ? "text-text-caption" : null
          )}
        >
          {title}
        </div>
        <div
          className={cn(
            "text-text-caption font-normal",
            disable ? "text-text-senary" : null
          )}
        >
          {subtitle}
        </div>
      </div>
    </Button>
  )
}
