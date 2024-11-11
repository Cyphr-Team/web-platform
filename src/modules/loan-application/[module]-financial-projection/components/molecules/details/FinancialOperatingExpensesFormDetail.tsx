import { Separator } from "@/components/ui/separator"
import { MM_YYYY_PATTERN } from "@/constants"
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
  type FpOperatingExpensesFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store"
import { sanitizeNumber, toCurrency } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { sum } from "lodash"
import {
  type FieldArrayWithId,
  type FieldPath,
  useFieldArray,
  useForm
} from "react-hook-form"

interface FinancialOperatingExpensesFormDetailProps {
  fpOperatingExpensesFormValue?: FpOperatingExpensesFormValue
}

export function FinancialOperatingExpensesFormDetail({
  fpOperatingExpensesFormValue
}: FinancialOperatingExpensesFormDetailProps) {
  const form = useForm<FpOperatingExpensesFormValue>({
    resolver: zodResolver(fpOperatingExpensesFormSchema),
    mode: "onBlur",
    values: fpOperatingExpensesFormValue
      ? fpOperatingExpensesFormValue
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
    <div className="flex flex-col gap-2xl pt-4 px-4 md:px-8 pb-4 md:pb-8">
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

function OperatingExpenses(props: OperatingExpensesProps) {
  const { index, value } = props

  return (
    <div key={value.id} className="flex gap-3">
      <div className="grid grid-cols-6 w-full gap-5 items-center">
        <div className="row-start-1 col-start-1 col-end-3 flex gap-1 flex-col">
          <RHFTextInput
            isDetail
            isHideErrorMessage
            isToggleView
            className="font-medium text-sm"
            label=""
            name={getArrayFieldName<
              FpOperatingExpensesField,
              FieldPath<FpOperatingExpensesFormValue>
            >(FpOperatingExpensesField.operatingExpensesName, index)}
            placeholder="Operating expenses name"
            styleProps={{ inputClassName: "h-6 text-sm max-w-52 -mt-1.5" }}
          />
          <RHFTextInput
            isDetail
            isHideErrorMessage
            isToggleView
            className="mt-auto text-xs text-text-secondary"
            label=""
            name={getArrayFieldName<
              FpOperatingExpensesField,
              FieldPath<FpOperatingExpensesFormValue>
            >(FpOperatingExpensesField.operatingExpensesDescription, index)}
            placeholder="Add description"
            styleProps={{ inputClassName: "h-6 text-xs max-w-32 -mb-1.5" }}
          />
        </div>
        <RHFMaskInput
          isDetail
          isHideErrorMessage
          className="row-start-1 col-start-4 col-end-5 mt-0"
          label=""
          name={getArrayFieldName<
            FpOperatingExpensesField,
            FieldPath<FpOperatingExpensesFormValue>
          >(FpOperatingExpensesField.operatingExpensesStartDate, index)}
          pattern={MM_YYYY_PATTERN}
          placeholder="MM/YYYY"
        />
        <RHFCurrencyInput
          isDetail
          isHideErrorMessage
          className="row-start-1 col-start-5 col-end-7 mt-0 text-right"
          label=""
          name={getArrayFieldName<
            FpOperatingExpensesField,
            FieldPath<FpOperatingExpensesFormValue>
          >(FpOperatingExpensesField.operatingExpensesMonthlyCost, index)}
          prefixIcon="$ "
          suffixIcon={<span> /mo</span>}
        />
      </div>
    </div>
  )
}
