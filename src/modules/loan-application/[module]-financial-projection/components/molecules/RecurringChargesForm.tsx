import { memo } from "react"
import { RevenueType } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import ArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/ArrayFormTemplate.tsx"
import { RecurringChargesIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/RecurringChargesIcon.tsx"
import {
  type Block,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import ContentTooltip from "@/modules/loan-application/[module]-financial-projection/components/molecules/ContentTooltip.tsx"
import { YES_NO_OPTIONS } from "@/modules/loan-application/constants/form.ts"
import { emptyRecurringCharge } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-revenue-store.ts"
import { CHARGE_FREQUENCIES } from "@/modules/loan-application/[module]-financial-projection/components/store/recurring-charges-store"

const enum FieldName {
  Name = "name",
  StartDate = "startDate",
  MonthlyNewCustomer = "monthlyNewCustomer",
  RecurringCharge = "recurringCharge",
  Frequency = "frequency",
  ChurnRate = "churnRate",
  HasUpfrontFee = "hasUpfrontFee",
  UpfrontFee = "upfrontFee"
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
    name: FieldName.MonthlyNewCustomer,
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
    name: FieldName.RecurringCharge,
    type: FieldType.CURRENCY,
    props: {
      label: "Recurring charge:",
      isRowDirection: true,
      placeholder: "Recurring charge",
      prefixIcon: "$",
      styleProps: {
        inputClassName: "min-w-72 text-sm pl-7.5"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: FieldName.Frequency,
    type: FieldType.SELECT,
    props: {
      label: "Specify how often this charge is assessed:",
      isRowDirection: true,
      placeholder: "Please select",
      styleProps: {
        inputClassName: "w-72 min-w-72 text-sm"
      },
      options: CHARGE_FREQUENCIES
    }
  },
  {
    name: FieldName.ChurnRate,
    type: FieldType.NUMBER,
    props: {
      label: (
        <div className="flex flex-row items-center justify-start">
          <div>Percentage of customers you expect not to renew:</div>
          <ContentTooltip content="A normal churn rate is around 10%, but depends on the business type." />
        </div>
      ),
      isRowDirection: true,
      placeholder: "Customers not to renew %",
      suffixIcon: "%",
      styleProps: {
        inputClassName: "min-w-72 text-sm no-arrows"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: FieldName.HasUpfrontFee,
    type: FieldType.SELECT,
    props: {
      label: "Indicate whether you will charge an upfront fee:",
      isRowDirection: true,
      placeholder: "Please select",
      styleProps: {
        inputClassName: "w-72 min-w-72 text-sm"
      },
      options: YES_NO_OPTIONS,
      isHideErrorMessage: true
    }
  },
  {
    name: FieldName.UpfrontFee,
    type: FieldType.CURRENCY,
    props: {
      label: "Upfront fee:",
      isRowDirection: true,
      placeholder: "Upfront fee",
      prefixIcon: "$",
      styleProps: {
        inputClassName: "min-w-72 text-sm pl-7.5"
      },
      isHideErrorMessage: true
    }
  }
]

interface RecurringChargesFormProps {
  onBlur: VoidFunction
}

function RecurringChargesForm(props: RecurringChargesFormProps) {
  const { onBlur } = props

  return (
    <ArrayFormTemplate
      addIcon={<RecurringChargesIcon variant="black" />}
      blocks={blocks}
      dataName="recurring charges"
      defaultEmptyObject={emptyRecurringCharge}
      fieldName={RevenueType.RecurringCharges}
      subtitle="Perfect for subscriptions, memberships, rentals, or any service with periodic payments."
      title="Revenue: Recurring Charges"
      onBlur={onBlur}
    />
  )
}

export default memo(RecurringChargesForm)
