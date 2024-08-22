import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"
import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { RecurringCharge } from "@/modules/financial-projection/types"
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
import { generateMonthsList } from "@/utils/time-range.utils.ts"
import { v4 } from "uuid"

const enum FormField {
  ID = "id",
  FINANCIAL_PROJECTION_ID = "financialProjectionId",
  NAME = "name",
  NEW_CUSTOMERS_MONTHLY = "newCustomersMonthly",
  ANNUAL_CHURN_RATE = "annualChurnRate",
  ANNUAL_PRICE = "annualPrice",
  FREQUENCY_MONTHS = "frequencyMonths",
  UPFRONT_FEE = "upfrontFee",
  BILLED_SUBSCRIPTIONS = "billedSubscriptions",
  SUBSCRIPTIONS_AVAILABLE_FOR_RENEWAL = "subscriptionsAvailableForRenewal",
  CHURNED_SUBSCRIPTIONS = "churnedSubscriptions",
  RENEWED_SUBSCRIPTIONS = "renewedSubscriptions",
  START_DATE = "startDate"
}

const schema = z.object({
  [FormField.ID]: z.string().optional(),
  [FormField.FINANCIAL_PROJECTION_ID]: z.string().optional(),
  [FormField.NAME]: z.string(),
  [FormField.NEW_CUSTOMERS_MONTHLY]: z.coerce.number().min(0),
  [FormField.ANNUAL_CHURN_RATE]: z.coerce.number().min(0).max(100),
  [FormField.ANNUAL_PRICE]: z.coerce.number().min(0),
  [FormField.FREQUENCY_MONTHS]: z.coerce.number().min(1),
  [FormField.UPFRONT_FEE]: z.coerce.number().min(0),
  [FormField.BILLED_SUBSCRIPTIONS]: z.coerce.number().min(0),
  [FormField.SUBSCRIPTIONS_AVAILABLE_FOR_RENEWAL]: z.coerce.number().min(0),
  [FormField.CHURNED_SUBSCRIPTIONS]: z.coerce.number().min(0),
  [FormField.RENEWED_SUBSCRIPTIONS]: z.coerce.number().min(0),
  [FormField.START_DATE]: z.string()
})

const columns: ColumnDef<RecurringCharge>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    size: 100,
    cell: ({ row }) => <div className="text-left">{row.original.name}</div>
  },
  {
    id: "startDate",
    accessorKey: "startDate",
    header: "Start date",
    cell: ({ row }) => (
      <div className="text-left">
        {formatDate(row.original.startDate, FORMAT_DATE_MMM_D_Y)}
      </div>
    )
  },
  {
    id: "newCustomersMonthly",
    accessorKey: "newCustomersMonthly",
    header: "New Customers (Monthly)",
    cell: ({ row }) => (
      <div className="text-left">{row.original.newCustomersMonthly}</div>
    )
  },
  {
    id: "annualChurnRate",
    accessorKey: "annualChurnRate",
    header: "Annual Churn Rate (%)",
    cell: ({ row }) => (
      <div className="text-left">{row.original.annualChurnRate}%</div>
    )
  },
  {
    id: "annualPrice",
    accessorKey: "annualPrice",
    header: "Annual Price ($)",
    cell: ({ row }) => (
      <div className="text-left">${row.original.annualPrice.toFixed(2)}</div>
    )
  },
  {
    id: "frequencyMonths",
    accessorKey: "frequencyMonths",
    header: "Frequency (Months)",
    cell: ({ row }) => (
      <div className="text-left">{row.original.frequencyMonths}</div>
    )
  },
  {
    id: "upfrontFee",
    accessorKey: "upfrontFee",
    header: "Upfront Fee ($)",
    cell: ({ row }) => (
      <div className="text-left">${row.original.upfrontFee.toFixed(2)}</div>
    )
  },
  {
    id: "billedSubscriptions",
    accessorKey: "billedSubscriptions",
    header: "Billed Subscriptions",
    cell: ({ row }) => (
      <div className="text-left">{row.original.billedSubscriptions}</div>
    )
  },
  {
    id: "subscriptionsAvailableForRenewal",
    accessorKey: "subscriptionsAvailableForRenewal",
    header: "Subscriptions Available for Renewal",
    cell: ({ row }) => (
      <div className="text-left">
        {row.original.subscriptionsAvailableForRenewal}
      </div>
    )
  },
  {
    id: "churnedSubscriptions",
    accessorKey: "churnedSubscriptions",
    header: "Churned Subscriptions",
    cell: ({ row }) => (
      <div className="text-left">{row.original.churnedSubscriptions}</div>
    )
  },
  {
    id: "renewedSubscriptions",
    accessorKey: "renewedSubscriptions",
    header: "Renewed Subscriptions",
    cell: ({ row }) => (
      <div className="text-left">{row.original.renewedSubscriptions}</div>
    )
  }
]

const blocks: Block[] = [
  {
    type: FieldType.TEXT,
    name: FormField.NAME,
    props: {
      label: "Name for recurring charge",
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: FormField.START_DATE,
    props: {
      label: "When will this recurring charge start?",
      className: "col-span-6",
      // TODO: fix the date logic after we have BE
      options: generateMonthsList(2025, 2027),
      required: true
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.NEW_CUSTOMERS_MONTHLY,
    props: {
      label: "New Customers (Monthly)",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.ANNUAL_CHURN_RATE,
    props: {
      label: "Annual Churn Rate (%)",
      className: "col-span-6",
      required: true,
      suffixIcon: <span className="text-text-tertiary">%</span>
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.ANNUAL_PRICE,
    props: {
      label: "Annual Price ($)",
      className: "col-span-6",
      required: true,
      prefixIcon: <span className="text-text-tertiary">$</span>
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.FREQUENCY_MONTHS,
    props: {
      label: "Frequency (Months)",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.UPFRONT_FEE,
    props: {
      label: "Upfront Fee ($)",
      className: "col-span-6",
      required: true,
      prefixIcon: <span className="text-text-tertiary">$</span>
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.BILLED_SUBSCRIPTIONS,
    props: {
      label: "Billed Subscriptions",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.SUBSCRIPTIONS_AVAILABLE_FOR_RENEWAL,
    props: {
      label: "Subscriptions Available for Renewal",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.CHURNED_SUBSCRIPTIONS,
    props: {
      label: "Churned Subscriptions",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.RENEWED_SUBSCRIPTIONS,
    props: {
      label: "Renewed Subscriptions",
      className: "col-span-6",
      required: true
    }
  }
]

const RecurringChargesForm = () => {
  const recurringCharges = useFinancialToolkitStore.use.recurringCharges()
  const { setRecurringCharges, setCurrentScreen } =
    useFinancialToolkitStore.use.action()

  const form = useForm<FieldValues>({
    mode: "onBlur",
    resolver: zodResolver(schema)
  })

  const onAdd = useCallback(
    (recurringCharge: RecurringCharge) => {
      setRecurringCharges([
        ...recurringCharges,
        {
          ...recurringCharge,
          id: v4()
        } as RecurringCharge
      ])
    },
    [recurringCharges, setRecurringCharges]
  )

  const onEdit = useCallback(
    (recurringCharge: RecurringCharge) => {
      const updatedRecurringCharges = recurringCharges.map((charge) =>
        charge.id === recurringCharge.id ? recurringCharge : charge
      )
      setRecurringCharges(updatedRecurringCharges)
    },
    [recurringCharges, setRecurringCharges]
  )

  const onDelete = useCallback(
    (recurringCharge: RecurringCharge) => {
      setRecurringCharges(
        recurringCharges.filter((value) => value.name !== recurringCharge.name)
      )
    },
    [recurringCharges, setRecurringCharges]
  )

  const onNextStep = useCallback(() => {
    setCurrentScreen(SCREEN.INPUT_CONTRACT_REVENUE)
  }, [setCurrentScreen])

  return (
    <DialogFormBase
      modelName="recurring charge"
      data={recurringCharges}
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

export default RecurringChargesForm
