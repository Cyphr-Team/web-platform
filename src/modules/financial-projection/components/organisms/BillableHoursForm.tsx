import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"
import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { BillableHour } from "@/modules/financial-projection/types"
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
import { v4 } from "uuid"
import { ProgressCell } from "@/modules/financial-projection/components/molecules"

const enum FormField {
  ID = "id",
  FINANCIAL_PROJECTION_ID = "financialProjectionId",
  NAME = "name",
  EXPECTED_MONTHLY_CUSTOMERS = "expectedMonthlyCustomers",
  MONTHLY_INCREASE_IN_CUSTOMERS = "monthlyIncreaseCustomers",
  START_DATE = "startDate",
  AVERAGE_MONTHLY_HOURS_BILLED_PER_CUSTOMER = "averageMonthlyHoursBilledPerCustomer",
  AVERAGE_HOURLY_RATE = "averageHourlyRate"
}

const schema = z.object({
  [FormField.ID]: z.string().optional(),
  [FormField.FINANCIAL_PROJECTION_ID]: z.string().optional(),
  [FormField.NAME]: z.string(),
  [FormField.EXPECTED_MONTHLY_CUSTOMERS]: z.coerce.number().min(0),
  [FormField.AVERAGE_MONTHLY_HOURS_BILLED_PER_CUSTOMER]: z.coerce
    .number()
    .min(0),
  [FormField.MONTHLY_INCREASE_IN_CUSTOMERS]: z.coerce.number().min(0).max(100),
  [FormField.AVERAGE_HOURLY_RATE]: z.coerce.number().min(0),
  [FormField.START_DATE]: z.string()
})

const columns: ColumnDef<BillableHour>[] = [
  {
    id: FormField.NAME,
    accessorKey: FormField.NAME,
    header: "Name",
    size: 100,
    cell: ({ row }) => <div className="text-left">{row.original.name}</div>
  },
  {
    id: FormField.AVERAGE_HOURLY_RATE,
    accessorKey: FormField.AVERAGE_HOURLY_RATE,
    header: "Unit price",
    cell: ({ row }) => (
      <div className="text-right">
        {USDFormatter(row.original.averageHourlyRate).format({ symbol: "$" })}
      </div>
    )
  },
  {
    id: FormField.AVERAGE_MONTHLY_HOURS_BILLED_PER_CUSTOMER,
    accessorKey: FormField.AVERAGE_MONTHLY_HOURS_BILLED_PER_CUSTOMER,
    header: "Unit price",
    cell: ({ row }) => (
      <div className="text-right">{row.original.averageHourlyRate}</div>
    )
  },
  {
    id: FormField.EXPECTED_MONTHLY_CUSTOMERS,
    accessorKey: FormField.EXPECTED_MONTHLY_CUSTOMERS,
    header: "Expected monthly customer",
    cell: ({ row }) => (
      <div className="text-right">{row.original.expectedMonthlyCustomers}</div>
    )
  },
  {
    id: FormField.MONTHLY_INCREASE_IN_CUSTOMERS,
    accessorKey: FormField.MONTHLY_INCREASE_IN_CUSTOMERS,
    header: "Monthly increase in customer",
    cell: ({ row }) => (
      <ProgressCell value={row.original.monthlyIncreaseCustomers} />
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
      label: "Name for billable hours",
      required: true
    }
  },
  {
    type: FieldType.CURRENCY,
    name: FormField.AVERAGE_HOURLY_RATE,
    props: {
      label: "Average hourly rate",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.AVERAGE_MONTHLY_HOURS_BILLED_PER_CUSTOMER,
    props: {
      label: "Average monthly hours billed per customer",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.PERCENTAGE,
    name: FormField.MONTHLY_INCREASE_IN_CUSTOMERS,
    props: {
      label: "Monthly increase in customers (%)",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.EXPECTED_MONTHLY_CUSTOMERS,
    props: {
      label: "Expected monthly customers",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.DATE,
    name: FormField.START_DATE,
    props: {
      label: "When will this billable hours start?",
      required: true
    }
  }
]

const BillableHoursForm = () => {
  const billableHours = useFinancialToolkitStore.use.billableHours()
  const { setBillableHours, setCurrentScreen } =
    useFinancialToolkitStore.use.action()

  const form = useForm<FieldValues>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      id: "",
      financialProjectionId: "",
      name: "",
      expectedMonthlyCustomers: "",
      monthlyIncreaseCustomers: "",
      startDate: "",
      averageMonthlyHoursBilledPerCustomer: "",
      averageHourlyRate: ""
    }
  })

  const onAdd = useCallback(
    (billableHour: BillableHour) => {
      setBillableHours([
        ...billableHours,
        {
          ...billableHour,
          id: v4()
        } as BillableHour
      ])
    },
    [billableHours, setBillableHours]
  )

  const onEdit = useCallback(
    (billableHour: BillableHour) => {
      const updatedBillableHours = billableHours.map((value) =>
        value.id === billableHour.id ? billableHour : value
      )
      setBillableHours(updatedBillableHours)
    },
    [billableHours, setBillableHours]
  )

  const onDelete = useCallback(
    (billableHour: BillableHour) => {
      setBillableHours(
        billableHours.filter((value) => value.name !== billableHour.name)
      )
    },
    [billableHours, setBillableHours]
  )

  const onNextStep = useCallback(() => {
    setCurrentScreen(SCREEN.INPUT_CONTRACT_REVENUE)
  }, [setCurrentScreen])

  return (
    <DialogFormBase
      modelName="billable hour"
      data={billableHours}
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

export default BillableHoursForm
