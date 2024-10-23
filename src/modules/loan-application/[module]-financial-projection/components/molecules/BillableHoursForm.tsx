import { memo } from "react"
import ArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/ArrayFormTemplate.tsx"
import { RevenueType } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import {
  type Block,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import ContentTooltip from "@/modules/loan-application/[module]-financial-projection/components/molecules/ContentTooltip.tsx"
import { BillableHoursIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/BillableHoursIcon.tsx"
import { emptyBillableHour } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-revenue-store.ts"

const enum FieldName {
  Name = "name",
  StartDate = "startDate",
  MonthlyNewCustomers = "monthlyNewCustomers",
  MonthlyNewCustomersIncrease = "monthlyNewCustomerIncreaseRate",
  AverageMonthlyHourBilledPerCustomer = "averageMonthlyHourBilledPerCustomer",
  HourlyRate = "hourlyRate"
}

const blocks: Block[] = [
  {
    name: FieldName.Name,
    type: FieldType.LEGACY_TEXT,
    props: {
      label: "The revenue stream in your forecast should be titled:",
      placeholder: "Enter name for revenue stream",
      isRowDirection: true,
      className: "flex items-center justify-between",
      inputClassName: "min-w-72 text-sm",
      hideMessage: true,
      labelClassName: "font-medium"
    }
  },
  {
    name: FieldName.StartDate,
    type: FieldType.MASK,
    props: {
      label: "Revenue stream start date:",
      pattern: "00/0000",
      placeholder: "MM/YYYY",
      isRowDirection: true,
      styleProps: {
        inputClassName: "min-w-72 text-sm"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: FieldName.MonthlyNewCustomers,
    type: FieldType.CURRENCY,
    props: {
      label: "Estimate new monthly customer sign-ups:",
      isRowDirection: true,
      placeholder: "Monthly sign-ups",
      suffixIcon: "/mo",
      styleProps: {
        inputClassName: "min-w-72 text-sm"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: FieldName.MonthlyNewCustomersIncrease,
    type: FieldType.NUMBER,
    props: {
      label: (
        <div className="flex flex-row items-center">
          <div>Estimate the monthly increase in new customers:</div>
          <ContentTooltip content="A monthly increase of 1%-5% is generally a healthy target for most businesses, helping to drive steady growth without overwhelming your operations" />
        </div>
      ),
      isRowDirection: true,
      placeholder: "Monthly increase",
      suffixIcon: "% /mo",
      styleProps: {
        inputClassName: "min-w-72 text-sm no-arrows"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: FieldName.AverageMonthlyHourBilledPerCustomer,
    type: FieldType.CURRENCY,
    props: {
      label: "Estimate average monthly billed hours per customer:",
      isRowDirection: true,
      placeholder: "Monthly hours billed",
      suffixIcon: "/mo",
      styleProps: {
        inputClassName: "min-w-72 text-sm"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: FieldName.HourlyRate,
    type: FieldType.CURRENCY,
    props: {
      label: "Price per hour:",
      isRowDirection: true,
      placeholder: "Average hourly rate",
      prefixIcon: "$",
      styleProps: {
        inputClassName: "min-w-72 text-sm"
      },
      isHideErrorMessage: true
    }
  }
]

interface BillableHoursFormProps {
  onBlur: VoidFunction
}

function BillableHoursForm(props: BillableHoursFormProps) {
  const { onBlur } = props

  return (
    <ArrayFormTemplate
      addIcon={<BillableHoursIcon variant="black" />}
      blocks={blocks}
      dataName="Billable hours"
      defaultEmptyObject={emptyBillableHour}
      fieldName={RevenueType.BILLABLE_HOURS}
      subtitle="Best for services charged on an hourly basis."
      title="Revenue: Billable Hours"
      onBlur={onBlur}
    />
  )
}

export default memo(BillableHoursForm)
