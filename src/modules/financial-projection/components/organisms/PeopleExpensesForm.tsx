import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"
import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PeopleExpense } from "@/modules/financial-projection/types"
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
import { Progress } from "@/components/ui/progress.tsx"

const enum FormField {
  ID = "id",
  FINANCIAL_PROJECTION_ID = "financialProjectionId",
  NAME = "name",
  SALARY = "salary",
  START_DATE = "startDate",
  BENEFIT = "benefit"
}

const schema = z.object({
  [FormField.ID]: z.string().optional(),
  [FormField.FINANCIAL_PROJECTION_ID]: z.string().optional(),
  [FormField.NAME]: z.string(),
  [FormField.SALARY]: z.coerce.number().min(0),
  [FormField.START_DATE]: z.string(),
  [FormField.BENEFIT]: z.coerce.number().min(0).max(100)
})

const columns: ColumnDef<PeopleExpense>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    size: 100,
    cell: ({ row }) => <div className="text-left">{row.original.name}</div>
  },
  {
    id: "salary",
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <div className="text-left">${row.original.salary}</div>
  },
  {
    id: "benefit",
    accessorKey: "benefit",
    header: "Benefit",
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-2 w-[175px]">
        <Progress value={row.original.benefit} />
        <div>{row.original.benefit}%</div>
      </div>
    )
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
  }
]

const blocks: Block[] = [
  {
    type: FieldType.TEXT,
    name: FormField.NAME,
    props: {
      label: "Title for the people",
      required: true
    }
  },
  {
    type: FieldType.CURRENCY,
    name: FormField.SALARY,
    props: {
      label: "Please enter their salary",
      required: true,
      prefixIcon: "$"
    }
  },
  {
    type: FieldType.PERCENTAGE,
    name: FormField.BENEFIT,
    props: {
      label: "Please enter benefit",
      required: true,
      suffixIcon: <span className="text-text-tertiary">%</span>
    }
  },
  {
    type: FieldType.DATE,
    name: FormField.START_DATE,
    props: {
      label: "Please enter start date",
      required: true
    }
  }
]

const PeopleExpenseForm = () => {
  const peopleExpenses = useFinancialToolkitStore.use.peopleExpenses()
  const { setPeopleExpenses, setCurrentScreen } =
    useFinancialToolkitStore.use.action()

  const form = useForm<FieldValues>({
    mode: "onBlur",
    resolver: zodResolver(schema)
  })

  const onAdd = useCallback(
    (people: PeopleExpense) => {
      setPeopleExpenses([...peopleExpenses, people])
    },
    [peopleExpenses, setPeopleExpenses]
  )

  const onEdit = useCallback(
    (people: PeopleExpense) => {
      const idx = peopleExpenses.findIndex((value) => value.id === people.id)
      peopleExpenses[idx] = people
      setPeopleExpenses([...peopleExpenses])
    },
    [peopleExpenses, setPeopleExpenses]
  )

  const onDelete = useCallback(
    (people: PeopleExpense) => {
      setPeopleExpenses(
        peopleExpenses.filter((value) => value.name !== people.name)
      )
    },
    [peopleExpenses, setPeopleExpenses]
  )

  const onNextStep = useCallback(() => {
    setCurrentScreen(SCREEN.INPUT_UNIT_SALES)
  }, [setCurrentScreen])

  return (
    <DialogFormBase
      modelName="contract revenue"
      data={peopleExpenses}
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

export default PeopleExpenseForm
