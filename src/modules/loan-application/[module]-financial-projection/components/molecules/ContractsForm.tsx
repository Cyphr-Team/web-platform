import { FC, memo } from "react"
import ArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/ArrayFormTemplate.tsx"
import { RevenueType } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { RecurringChargesIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/RecurringChargesIcon.tsx"
import {
  Block,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { emptyContract } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-revenue-store.ts"

const enum FieldName {
  NAME = "name",
  START_DATE = "startDate",
  END_DATE = "endDate",
  MONTHLY_REVENUE = "monthlyRevenue"
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
    name: FieldName.END_DATE,
    type: FieldType.MASK,
    props: {
      label: "Revenue stream end date:",
      pattern: "00/0000",
      placeholder: "MM/YYYY",
      isRowDirection: true,
      styleProps: {
        inputClassName: "min-w-72"
      }
    }
  },
  {
    name: FieldName.MONTHLY_REVENUE,
    type: FieldType.CURRENCY,
    props: {
      label: "Estimate the monthly revenue from this stream:",
      isRowDirection: true,
      placeholder: "Monthly revenue",
      prefixIcon: "$",
      suffixIcon: "/mo",
      styleProps: {
        inputClassName: "min-w-72"
      }
    }
  }
]

interface Props {
  onBlur: VoidFunction
}

const ContractsForm: FC<Props> = (props) => {
  const { onBlur } = props
  return (
    <ArrayFormTemplate
      title="Revenue: Contract Revenue"
      subtitle="Suitable for contract revenue, or for entering total revenue without itemized details."
      fieldName={RevenueType.CONTRACTS}
      dataName="contract revenue"
      defaultEmptyObject={emptyContract}
      onBlur={onBlur}
      blocks={blocks}
      addIcon={<RecurringChargesIcon variant="black" />}
    />
  )
}

export default memo(ContractsForm)
