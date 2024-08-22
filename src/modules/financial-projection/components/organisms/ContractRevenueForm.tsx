import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"
import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ContractRevenue } from "@/modules/financial-projection/types"
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
import { v4 } from "uuid"

const enum FormField {
  ID = "id",
  FINANCIAL_PROJECTION_ID = "financialProjectionId",
  NAME = "name",
  MONTHLY_REVENUE = "monthlyRevenue",
  START_DATE = "startDate",
  END_DATE = "endDate"
}

const schema = z.object({
  [FormField.ID]: z.string().optional(),
  [FormField.FINANCIAL_PROJECTION_ID]: z.string().optional(),
  [FormField.NAME]: z.string(),
  [FormField.MONTHLY_REVENUE]: z.coerce.number().min(0),
  [FormField.START_DATE]: z.string(),
  [FormField.END_DATE]: z.string()
})

const columns: ColumnDef<ContractRevenue>[] = [
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
    id: "endDate",
    accessorKey: "endDate",
    header: "End date",
    cell: ({ row }) => (
      <div className="text-left">
        {formatDate(row.original.endDate, FORMAT_DATE_MMM_D_Y)}
      </div>
    )
  },
  {
    id: "monthlyRevenue",
    accessorKey: "monthlyRevenue",
    header: "New Customers (Monthly)",
    cell: ({ row }) => (
      <div className="text-left">{row.original.monthlyRevenue}</div>
    )
  }
]

const blocks: Block[] = [
  {
    type: FieldType.TEXT,
    name: FormField.NAME,
    props: {
      label: "Name for contract revenue",
      required: true
    }
  },
  {
    type: FieldType.CURRENCY,
    name: FormField.MONTHLY_REVENUE,
    props: {
      label: "Please enter your monthly revenue",
      required: true,
      prefixIcon: "$"
    }
  },
  {
    type: FieldType.DATE,
    name: FormField.START_DATE,
    props: {
      label: "When was this contract start?",
      required: true
    }
  },
  {
    type: FieldType.DATE,
    name: FormField.END_DATE,
    props: {
      label: "When will this contract end?",
      required: true
    }
  }
]

const ContractRevenueForm = () => {
  const contractRevenues = useFinancialToolkitStore.use.contractRevenues()
  const { setContractRevenues, setCurrentScreen } =
    useFinancialToolkitStore.use.action()

  const form = useForm<FieldValues>({
    mode: "onBlur",
    resolver: zodResolver(schema)
  })

  const onAdd = useCallback(
    (contractRevenue: ContractRevenue) => {
      setContractRevenues([
        ...contractRevenues,
        {
          ...contractRevenue,
          id: v4()
        } as ContractRevenue
      ])
    },
    [contractRevenues, setContractRevenues]
  )

  const onEdit = useCallback(
    (contractRevenue: ContractRevenue) => {
      const updatedUnitSales = contractRevenues.map((value) =>
        value.id === contractRevenue.id ? contractRevenue : value
      )
      setContractRevenues(updatedUnitSales)
    },
    [contractRevenues, setContractRevenues]
  )

  const onDelete = useCallback(
    (contractRevenue: ContractRevenue) => {
      setContractRevenues(
        contractRevenues.filter((value) => value.name !== contractRevenue.name)
      )
    },
    [contractRevenues, setContractRevenues]
  )

  const onNextStep = useCallback(() => {
    setCurrentScreen(SCREEN.INPUT_UNIT_SALES)
  }, [setCurrentScreen])

  return (
    <DialogFormBase
      modelName="contract revenue"
      data={contractRevenues}
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

export default ContractRevenueForm
