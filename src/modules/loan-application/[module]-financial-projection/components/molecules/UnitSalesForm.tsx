import { FC, memo } from "react"
import {
  Block,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import ContentTooltip from "@/modules/loan-application/[module]-financial-projection/components/molecules/ContentTooltip.tsx"
import { RevenueType } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { UnitSalesIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/UnitSalesIcon.tsx"
import { emptyUnitSale } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-revenue-store.ts"
import ArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/ArrayFormTemplate.tsx"

const enum FieldName {
  NAME = "name",
  EST_UNIT_SALES = "estimateMonthlyUnitSales",
  EST_MONTHLY_INCREASE = "estimateMonthlySalesIncreaseRate",
  PRICE = "unitPrice",
  START_DATE = "startDate"
}

const blocks: Block[] = [
  {
    name: FieldName.NAME,
    type: FieldType.LEGACY_TEXT,
    props: {
      label: "The revenue stream in your forecast should be titled:",
      placeholder: "Name of revenue stream",
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
    name: FieldName.EST_UNIT_SALES,
    type: FieldType.CURRENCY,
    props: {
      label: (
        <div className="flex flex-row items-center">
          <div>Estimate monthly unit sales:</div>
          <ContentTooltip content="How you define a 'unit' depends on your product or service. For physical goods, enter the quantity you'll sell (e.g., shirts or computers). For services, units might represent consulting engagements, fixed-price contracts, or batches of materials, though these may be easier to enter as Contract Revenue or Recurring Charges. Choose what makes the most sense for your business." />
        </div>
      ),
      isRowDirection: true,
      placeholder: "Unit sales per month",
      suffixIcon: "/mo",
      styleProps: {
        inputClassName: "min-w-72"
      }
    }
  },
  {
    name: FieldName.EST_MONTHLY_INCREASE,
    type: FieldType.CURRENCY,
    props: {
      label: (
        <div className="flex flex-row items-center">
          <div>Estimate monthly increase in sales:</div>
          <ContentTooltip content="A monthly increase of 1%-5% is generally a healthy target for most businesses, helping to drive steady growth without overwhelming your operations." />
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
    name: FieldName.PRICE,
    type: FieldType.CURRENCY,
    props: {
      label: "Unit price:",
      isRowDirection: true,
      placeholder: "Enter unit price",
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

const UnitSalesForm: FC<Props> = (props) => {
  const { onBlur } = props

  return (
    <ArrayFormTemplate
      title="Revenue: Unit Sales"
      subtitle="Ideal for products sold as individual units or in specific quantities."
      fieldName={RevenueType.UNIT_SALES}
      dataName="Unit sales"
      addIcon={<UnitSalesIcon variant="black" />}
      defaultEmptyObject={emptyUnitSale}
      onBlur={onBlur}
      blocks={blocks}
    />
  )
}

export default memo(UnitSalesForm)
