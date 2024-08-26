import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"
import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { UnitSale } from "@/modules/financial-projection/types"
import { useCallback } from "react"
import DialogFormBase from "@/modules/financial-projection/components/organisms/DialogFormBase.tsx"
import { SCREEN } from "@/modules/financial-projection/constants"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/utils/date.utils.ts"
import { FORMAT_DATE_MMM_D_Y } from "@/constants/date.constants.ts"
import {
  Block,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"
import { Progress } from "@/components/ui/progress.tsx"
import { v4 } from "uuid"

const enum FormField {
  ID = "id",
  FINANCIAL_PROJECTION_ID = "financialProjectionId",
  NAME = "name",
  EXPECTED_MONTHLY_TRANSACTION = "expectedMonthlyTransaction",
  MONTHLY_INCREASE_IN_TRANSACTION = "monthlyIncreaseTransaction",
  UNIT_PRICE = "unitPrice",
  START_DATE = "startDate"
}

const schema = z.object({
  [FormField.ID]: z.string().optional(),
  [FormField.FINANCIAL_PROJECTION_ID]: z.string().optional(),
  [FormField.NAME]: z.string(),
  [FormField.EXPECTED_MONTHLY_TRANSACTION]: z.coerce.number().min(0),
  [FormField.UNIT_PRICE]: z.coerce.number().min(0),
  [FormField.MONTHLY_INCREASE_IN_TRANSACTION]: z.coerce
    .number()
    .min(0)
    .max(100),
  [FormField.START_DATE]: z.string()
})

const columns: ColumnDef<UnitSale>[] = [
  {
    id: FormField.NAME,
    accessorKey: FormField.NAME,
    header: "Name",
    size: 100,
    cell: ({ row }) => <div className="text-left">{row.original.name}</div>
  },
  {
    id: FormField.UNIT_PRICE,
    accessorKey: FormField.UNIT_PRICE,
    header: "Unit price",
    cell: ({ row }) => (
      <div className="text-right">
        {USDFormatter(row.original.unitPrice).format({ symbol: "$" })}
      </div>
    )
  },
  {
    id: FormField.EXPECTED_MONTHLY_TRANSACTION,
    accessorKey: FormField.EXPECTED_MONTHLY_TRANSACTION,
    header: "Expected monthly transactions",
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.expectedMonthlyTransaction}
      </div>
    )
  },
  {
    id: FormField.MONTHLY_INCREASE_IN_TRANSACTION,
    accessorKey: FormField.MONTHLY_INCREASE_IN_TRANSACTION,
    header: "Monthly increase in transaction",
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-2 w-full">
        <Progress value={row.original.monthlyIncreaseTransaction} />
        <div>{row.original.monthlyIncreaseTransaction}%</div>
      </div>
    )
  },
  {
    id: FormField.START_DATE,
    accessorKey: FormField.START_DATE,
    header: "Start date",
    cell: ({ row }) => (
      <div className="text-left">
        {formatDate(row.original.startDate, FORMAT_DATE_MMM_D_Y)}
      </div>
    )
  }
]

const blocks: Block[] = [
  {
    type: FieldType.TEXT,
    name: FormField.NAME,
    props: {
      label: "Name for unit sale",
      required: true
    }
  },

  {
    type: FieldType.CURRENCY,
    name: FormField.UNIT_PRICE,
    props: {
      label: "Price for this unit",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.PERCENTAGE,
    name: FormField.MONTHLY_INCREASE_IN_TRANSACTION,
    props: {
      label: "Monthly increase in transactions (%)",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.EXPECTED_MONTHLY_TRANSACTION,
    props: {
      label: "Expected monthly transactions",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.DATE,
    name: FormField.START_DATE,
    props: {
      label: "When will this unit sale start?",
      required: true,
      styleProps: {
        itemClassName: "col-span-6"
      }
    }
  }
]

const UnitSalesForm = () => {
  const unitSales = useFinancialToolkitStore.use.unitSales()
  const { setUnitSales, setCurrentScreen } =
    useFinancialToolkitStore.use.action()

  const form = useForm<FieldValues>({
    mode: "onBlur",
    resolver: zodResolver(schema)
  })

  const onAdd = useCallback(
    (unitSale: UnitSale) => {
      setUnitSales([
        ...unitSales,
        {
          ...unitSale,
          id: v4()
        } as UnitSale
      ])
    },
    [unitSales, setUnitSales]
  )

  const onEdit = useCallback(
    (unitSale: UnitSale) => {
      const updatedUnitSales = unitSales.map((value) =>
        value.id === unitSale.id ? unitSale : value
      )
      setUnitSales(updatedUnitSales)
    },
    [unitSales, setUnitSales]
  )

  const onDelete = useCallback(
    (unitSale: UnitSale) => {
      setUnitSales(unitSales.filter((value) => value.name !== unitSale.name))
    },
    [unitSales, setUnitSales]
  )

  const onNextStep = useCallback(() => {
    setCurrentScreen(SCREEN.INPUT_CONTRACT_REVENUE)
  }, [setCurrentScreen])

  return (
    <DialogFormBase
      modelName="unit sale"
      data={unitSales}
      columns={columns}
      form={form}
      blocks={blocks}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      onNextStep={onNextStep}
    />
  )
}

export default UnitSalesForm
