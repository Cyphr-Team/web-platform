import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
  FP_OPERATING_EXPENSES_DEFAULT_VALUE,
  FpOperatingExpensesField,
  fpOperatingExpensesFormSchema,
  FpOperatingExpensesFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store"

import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { sanitizeNumber, toCurrency } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { sum } from "lodash"
import { Plus, X } from "lucide-react"
import {
  FieldArrayWithId,
  FieldPath,
  useFieldArray,
  useForm,
  useFormContext
} from "react-hook-form"

export const FpOperatingExpensesForm = () => {
  const { fpOperatingExpenses, dispatchFormAction } =
    useLoanApplicationFormContext()

  const form = useForm<FpOperatingExpensesFormValue>({
    resolver: zodResolver(fpOperatingExpensesFormSchema),
    mode: "onBlur",
    defaultValues: fpOperatingExpenses ?? FP_OPERATING_EXPENSES_DEFAULT_VALUE
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: FpOperatingExpensesField.operatingExpenses
  })

  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const onSubmit = form.handleSubmit((data) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES,
      state: data
    })
    finishCurrentStep()
  })

  const handleAddFounder = () => {
    append({ name: "", description: "", startDate: "", monthlyCost: 0 })
    onAutoSave()
  }

  const onRemove = (index: number) => () => {
    remove(index)
    onAutoSave()
  }

  const onAutoSave = () => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES,
      state: form.getValues()
    })
  }

  const operationExpenses = form.getValues().operatingExpenses
  const total = sum(
    operationExpenses.map((operationExpense) =>
      sanitizeNumber(operationExpense.monthlyCost)
    )
  )

  useAutoCompleteStepEffect(
    form,
    LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES,
    true
  )

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <div className="flex flex-col gap-4">
        <h5 className="text-lg font-semibold">Operating Expenses (Monthly)</h5>
        <p className="text-sm financial-projection text-muted-foreground">
          Operating Expenses are costs directly related to the day-to-day
          functioning of your business. Please specify the amount for some
          common expense categories below, and add any that apply to your
          business. For categories which don’t apply, please leave them blank.
        </p>
        <p className="text-sm financial-projection text-muted-foreground">
          (Note: This form excludes Non-Operating expenses such as Interest
          Expense, Income Taxes, Raw Materials, or Losses from Asset Sales).
        </p>
      </div>

      <Separator />
      <div className="grid grid-cols-6 w-full gap-5 items-center text-xs font-medium">
        <p className="row-start-1 col-start-1 col-end-3">
          Operating Expense name
        </p>
        <p className="row-start-1 col-start-3 col-end-5">Cost start date</p>
        <p className="row-start-1 col-start-5 col-end-7">Monthly cost</p>
      </div>
      <RHFProvider methods={form} onSubmit={onSubmit}>
        <div className="flex flex-col gap-6 mb-5">
          {fields.map((founder, index) => (
            <OperatingExpenses
              key={founder.id}
              index={index}
              value={founder}
              onRemove={onRemove(index)}
            />
          ))}
        </div>

        <div className="flex">
          <Button
            type="button"
            variant="outline"
            className="w-min ml-auto border-black gap-2"
            onClick={handleAddFounder}
          >
            <Plus className="w-4" />
            Add operating expense
          </Button>
        </div>
        <Separator className="my-5" />

        <div className="flex justify-between text-sm font-semibold">
          <p>TOTAL MONTHLY OPERATING EXPENSE</p>
          <p>{toCurrency(total, 0)} / mo</p>
        </div>

        {!isReviewApplicationStep(step) && (
          <div className="flex flex-col gap-2xl mt-4">
            <Button>Next</Button>
          </div>
        )}
      </RHFProvider>
    </Card>
  )
}

interface OperatingExpensesProps {
  index: number
  value: FieldArrayWithId<
    FpOperatingExpensesFormValue["operatingExpenses"][number]
  >
  onRemove: VoidFunction
}

const OperatingExpenses = (props: OperatingExpensesProps) => {
  const { index, value, onRemove } = props
  const form = useFormContext<FpOperatingExpensesFormValue>()

  // Apply the requirement, we can remove only when the items > 1
  const isRemovable =
    form.getValues(FpOperatingExpensesField.operatingExpenses).length > 1

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
          />
        </div>
        <RHFMaskInput
          label=""
          pattern={MM_YYYY_PATTERN}
          className="row-start-1 col-start-3 col-end-5 mt-0"
          placeholder="MM/YYYY"
          name={getArrayFieldName<
            FpOperatingExpensesField,
            FieldPath<FpOperatingExpensesFormValue>
          >(FpOperatingExpensesField.operatingExpensesStartDate, index)}
          isHideErrorMessage
        />
        <RHFCurrencyInput
          label=""
          className="row-start-1 col-start-5 col-end-7 mt-0"
          prefixIcon="$"
          suffixIcon={<span className="text-gray-400">/ mo</span>}
          name={getArrayFieldName<
            FpOperatingExpensesField,
            FieldPath<FpOperatingExpensesFormValue>
          >(FpOperatingExpensesField.operatingExpensesMonthlyCost, index)}
          isHideErrorMessage
        />
      </div>

      {isRemovable && (
        <div className="flex justify-between items-center">
          <Button
            tabIndex={-1}
            type="button"
            variant="ghost"
            className="p-0 py-0 h-auto"
            onClick={onRemove}
          >
            <X className="w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
