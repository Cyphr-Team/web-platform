import { Separator } from "@/components/ui/separator"
import { MM_YYYY_PATTERN } from "@/constants"
import { cn } from "@/lib/utils"
import {
  RHFCurrencyInput,
  RHFMaskInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { getArrayFieldName } from "@/modules/form-template/components/utils"
import { RHFProvider } from "@/modules/form-template/providers"
import {
  FpOperatingExpensesField,
  fpOperatingExpensesFormSchema,
  FpOperatingExpensesFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store"
import { reverseFormatFpOperatingExpensesForm } from "@/modules/loan-application/[module]-financial-projection/hooks/operating-expenses/useSubmitOperatingExpensesForm"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { sanitizeNumber, toCurrency } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { sum } from "lodash"
import {
  FieldArrayWithId,
  FieldPath,
  useFieldArray,
  useForm
} from "react-hook-form"

export const FinancialOperatingExpensesFormDetail = () => {
  const { fpOperatingExpensesFormQuery } = useGetFinancialProjectForms()

  const form = useForm<FpOperatingExpensesFormValue>({
    resolver: zodResolver(fpOperatingExpensesFormSchema),
    mode: "onBlur",
    values: fpOperatingExpensesFormQuery.data
      ? reverseFormatFpOperatingExpensesForm(fpOperatingExpensesFormQuery.data)
      : { [FpOperatingExpensesField.operatingExpenses]: [] }
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: FpOperatingExpensesField.operatingExpenses
  })

  const operationExpenses = form.getValues().operatingExpenses
  const total = sum(
    operationExpenses?.map((operationExpense) =>
      sanitizeNumber(operationExpense.monthlyCost)
    )
  )

  return (
    <div className={cn("flex flex-col gap-2xl")}>
      <div className="grid grid-cols-6 w-full gap-5 items-center text-xs font-medium">
        <p className="row-start-1 col-start-1 col-end-3">
          Operating Expense name
        </p>
        <p className="row-start-1 col-start-4 col-end-5">Cost start date</p>
        <p className="row-start-1 col-start-5 col-end-7 text-right">
          Monthly cost
        </p>
      </div>
      <RHFProvider methods={form}>
        <div className="flex flex-col gap-6 mb-5">
          {fields?.map((founder, index) => (
            <OperatingExpenses key={founder.id} index={index} value={founder} />
          ))}
        </div>

        <Separator className="my-5" />

        <div className="flex justify-between text-sm font-semibold">
          <p>TOTAL MONTHLY OPERATING EXPENSE</p>
          <p>{toCurrency(total, 0)} / mo</p>
        </div>
      </RHFProvider>
    </div>
  )
}

interface OperatingExpensesProps {
  index: number
  value: FieldArrayWithId<
    FpOperatingExpensesFormValue["operatingExpenses"][number]
  >
}
const OperatingExpenses = (props: OperatingExpensesProps) => {
  const { index, value } = props

  return (
    <div className="flex gap-3" key={value.id}>
      <div className="grid grid-cols-6 w-full gap-5 items-center">
        <div className="row-start-1 col-start-1 col-end-3 flex gap-1 flex-col">
          <RHFTextInput
            label=""
            className="font-medium text-sm"
            placeholder="Operating expenses name"
            styleProps={{ inputClassName: "h-6 text-sm max-w-52 -mt-1.5" }}
            name={getArrayFieldName<
              FpOperatingExpensesField,
              FieldPath<FpOperatingExpensesFormValue>
            >(FpOperatingExpensesField.operatingExpensesName, index)}
            isToggleView
            isHideErrorMessage
            isDetail
          />
          <RHFTextInput
            label=""
            className="mt-auto text-xs text-text-secondary"
            styleProps={{ inputClassName: "h-6 text-xs max-w-32 -mb-1.5" }}
            placeholder="Add description"
            name={getArrayFieldName<
              FpOperatingExpensesField,
              FieldPath<FpOperatingExpensesFormValue>
            >(FpOperatingExpensesField.operatingExpensesDescription, index)}
            isToggleView
            isHideErrorMessage
            isDetail
          />
        </div>
        <RHFMaskInput
          isDetail
          label=""
          pattern={MM_YYYY_PATTERN}
          className="row-start-1 col-start-4 col-end-5 mt-0"
          placeholder="MM/YYYY"
          name={getArrayFieldName<
            FpOperatingExpensesField,
            FieldPath<FpOperatingExpensesFormValue>
          >(FpOperatingExpensesField.operatingExpensesStartDate, index)}
          isHideErrorMessage
        />
        <RHFCurrencyInput
          isDetail
          label=""
          className="row-start-1 col-start-5 col-end-7 mt-0 text-right"
          prefixIcon="$ "
          suffixIcon={<span> /mo</span>}
          name={getArrayFieldName<
            FpOperatingExpensesField,
            FieldPath<FpOperatingExpensesFormValue>
          >(FpOperatingExpensesField.operatingExpensesMonthlyCost, index)}
          isHideErrorMessage
        />
      </div>
    </div>
  )
}
