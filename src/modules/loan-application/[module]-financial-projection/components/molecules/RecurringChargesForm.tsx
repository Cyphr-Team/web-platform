import { FC, memo } from "react"
import { RevenueType } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import ArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/ArrayFormTemplate.tsx"
import { RecurringChargesIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/RecurringChargesIcon.tsx"
import {
  Block,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import ContentTooltip from "@/modules/loan-application/[module]-financial-projection/components/molecules/ContentTooltip.tsx"
import { YES_NO_OPTIONS } from "@/modules/loan-application/constants/form.ts"
import { emptyRecurringCharge } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-revenue-store.ts"

const enum FieldName {
  NAME = "name",
  START_DATE = "startDate",
  MONTHLY_NEW_CUSTOMER = "monthlyNewCustomer",
  RECURRING_CHARGE = "recurringCharge",
  FREQUENCY = "frequency",
  CHURN_RATE = "churnRate",
  HAS_UPFRONT_FEE = "hasUpfrontFee",
  UPFRONT_FEE = "upfrontFee"
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
    name: FieldName.MONTHLY_NEW_CUSTOMER,
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
    name: FieldName.RECURRING_CHARGE,
    type: FieldType.CURRENCY,
    props: {
      label: "Recurring charge:",
      isRowDirection: true,
      placeholder: "Recurring charge",
      prefixIcon: "$",
      styleProps: {
        inputClassName: "min-w-72"
      }
    }
  },
  {
    name: FieldName.FREQUENCY,
    type: FieldType.SELECT,
    props: {
      label: "Specify how often this charge is assessed:",
      isRowDirection: true,
      placeholder: "Please select",
      styleProps: {
        inputClassName: "w-72"
      },
      options: [
        {
          label: "Monthly",
          value: "1"
        },
        {
          label: "Quarterly",
          value: "4"
        },
        {
          label: "Semi-Annually",
          value: "6"
        },
        {
          label: "Annually",
          value: "12"
        }
      ]
    }
  },
  {
    name: FieldName.CHURN_RATE,
    type: FieldType.CURRENCY,
    props: {
      label: (
        <div className="flex flex-row items-center">
          <div>Percentage of customers you expect not to renew</div>
          <ContentTooltip content="A normal churn rate is around 10%, but depends on the business type." />
        </div>
      ),
      isRowDirection: true,
      placeholder: "Customers not to renew %",
      suffixIcon: "%",
      styleProps: {
        inputClassName: "min-w-72"
      }
    }
  },
  {
    name: FieldName.HAS_UPFRONT_FEE,
    type: FieldType.SELECT,
    props: {
      label: "Indicate whether you will charge an upfront fee:",
      isRowDirection: true,
      placeholder: "Please select",
      styleProps: {
        inputClassName: "w-72"
      },
      options: YES_NO_OPTIONS
    }
  },
  {
    name: FieldName.UPFRONT_FEE,
    type: FieldType.CURRENCY,
    props: {
      label: "Upfront fee:",
      isRowDirection: true,
      placeholder: "Upfront fee",
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

const RecurringChargesForm: FC<Props> = (props) => {
  const { onBlur } = props

  return (
    <ArrayFormTemplate
      title="Revenue: Recurring Charges"
      subtitle="Perfect for subscriptions, memberships, rentals, or any service with periodic payments."
      fieldName={RevenueType.RECURRING_CHARGES}
      dataName="recurring charges"
      defaultEmptyObject={emptyRecurringCharge}
      onBlur={onBlur}
      blocks={blocks}
      addIcon={<RecurringChargesIcon variant="black" />}
    />
  )
}

export default memo(RecurringChargesForm)
