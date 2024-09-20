import { FC, memo } from "react"
import ArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/ArrayFormTemplate.tsx"
import { RevenueType } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import {
  Block,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import ContentTooltip from "@/modules/loan-application/[module]-financial-projection/components/molecules/ContentTooltip.tsx"
import { BillableHoursIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/BillableHoursIcon.tsx"
import { emptyBillableHour } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-revenue-store.ts"

const enum FieldName {
  NAME = "name",
  START_DATE = "startDate",
  MONTHLY_NEW_CUSTOMERS = "monthlyNewCustomers",
  MONTHLY_NEW_CUSTOMERS_INCREASE = "monthlyNewCustomerIncreaseRate",
  AVERAGE_MONTHLY_HOUR_BILLED_PER_CUSTOMER = "averageMonthlyHourBilledPerCustomer",
  HOURLY_RATE = "hourlyRate"
}

const blocks: Block[] = [
  {
    name: FieldName.NAME,
    type: FieldType.LEGACY_TEXT,
    props: {
      label: "The revenue stream in your forecast should be titled:",
      placeholder: "Enter name for revenue stream",
      isRowDirection: true,
      className: "flex items-center justify-between",
      inputClassName: "min-w-72",
      hideMessage: true
    }
  },
  {
    name: FieldName.START_DATE,
    type: FieldType.MASK,
    props: {
      label: "Revenue stream start date:",
      pattern: "00/0000",
      placeholder: "MM/YYYY",
      isRowDirection: true,
      styleProps: {
        inputClassName: "min-w-72"
      }
    }
  },
  {
    name: FieldName.MONTHLY_NEW_CUSTOMERS,
    type: FieldType.CURRENCY,
    props: {
      label: "Estimate new monthly customer sign-ups:",
      isRowDirection: true,
      placeholder: "Monthly sign-ups",
      suffixIcon: "/mo",
      styleProps: {
        inputClassName: "min-w-72"
      }
    }
  },
  {
    name: FieldName.MONTHLY_NEW_CUSTOMERS_INCREASE,
    type: FieldType.CURRENCY,
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
        inputClassName: "min-w-72"
      }
    }
  },
  {
    name: FieldName.AVERAGE_MONTHLY_HOUR_BILLED_PER_CUSTOMER,
    type: FieldType.CURRENCY,
    props: {
      label: "Estimate average monthly billed hours per customer:",
      isRowDirection: true,
      placeholder: "Monthly hours billed",
      suffixIcon: "/mo",
      styleProps: {
        inputClassName: "min-w-72"
      }
    }
  },
  {
    name: FieldName.HOURLY_RATE,
    type: FieldType.CURRENCY,
    props: {
      label: "Price per hour:",
      isRowDirection: true,
      placeholder: "Average hourly rate",
      prefixIcon: "$",
      styleProps: {
        inputClassName: "min-w-72"
      }
    }
  }
]

interface Props {
  onBlur: VoidFunction
}

const BillableHoursForm: FC<Props> = (props) => {
  const { onBlur } = props

  return (
    <ArrayFormTemplate
      title="Revenue: Billable Hours"
      subtitle="Best for services charged on an hourly basis."
      fieldName={RevenueType.BILLABLE_HOURS}
      dataName="Billable hours"
      defaultEmptyObject={emptyBillableHour}
      onBlur={onBlur}
      blocks={blocks}
      addIcon={<BillableHoursIcon variant="black" />}
    />
  )
}

export default memo(BillableHoursForm)
