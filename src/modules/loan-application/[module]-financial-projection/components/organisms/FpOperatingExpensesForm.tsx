import { Button } from "@/components/ui/button"
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
  FP_OPERATING_EXPENSES_DEFAULT_VALUE,
  FpOperatingExpensesField,
  fpOperatingExpensesFormSchema,
  type FpOperatingExpensesFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store"

import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
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
  type FieldArrayWithId,
  type FieldPath,
  useFieldArray,
  useForm,
  useFormContext
} from "react-hook-form"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"

export function FpOperatingExpensesForm() {
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
    <FormLayout title="Operating Expenses (Monthly)">
      <div className="flex flex-col gap-4">
        <h5 className="text-lg font-semibold">Operating Expenses (Monthly)</h5>
        <p className="financial-projection text-sm text-muted-foreground">
          Operating Expenses are costs directly related to the day-to-day
          functioning of your business. Please specify the amount for some
          common expense categories below, and add any that apply to your
          business. For categories which don’t apply, please leave them blank.
        </p>
        <p className="financial-projection text-sm text-muted-foreground">
          (Note: This form excludes Non-Operating expenses such as Interest
          Expense, Income Taxes, Raw Materials, or Losses from Asset Sales).
        </p>
      </div>

      <Separator />
      <div className="grid w-full grid-cols-6 items-center gap-5 text-xs font-medium">
        <p className="col-start-1 col-end-3 row-start-1">
          Operating expense name
        </p>
        <p className="col-start-3 col-end-5 row-start-1">Cost start date</p>
        <p className="col-start-5 col-end-7 row-start-1">Monthly cost</p>
      </div>
      <RHFProvider methods={form} onSubmit={onSubmit}>
        <div className="mb-5 flex flex-col gap-6">
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
            className="ml-auto w-min gap-2 border-black"
            type="button"
            variant="outline"
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
          <div className="mt-4 flex flex-col gap-2xl">
            <Button disabled={!form.formState.isValid}>Next</Button>
          </div>
        )}
      </RHFProvider>
    </FormLayout>
  )
}

interface OperatingExpensesProps {
  index: number
  value: FieldArrayWithId<
    FpOperatingExpensesFormValue["operatingExpenses"][number]
  >
  onRemove: VoidFunction
}

function OperatingExpenses(props: OperatingExpensesProps) {
  const { index, value, onRemove } = props
  const form = useFormContext<FpOperatingExpensesFormValue>()

  // Apply the requirement, we can remove only when the items > 1
  const isRemovable =
    form.getValues(FpOperatingExpensesField.operatingExpenses).length > 1

  return (
    <div key={value.id} className="flex gap-3">
      <div className="grid w-full grid-cols-6 items-center gap-5">
        <div className="col-start-1 col-end-3 row-start-1 flex flex-col gap-1">
          <RHFTextInput
            isHideErrorMessage
            isToggleView
            className="text-sm font-medium"
            label=""
            name={getArrayFieldName<
              FpOperatingExpensesField,
              FieldPath<FpOperatingExpensesFormValue>
            >(FpOperatingExpensesField.operatingExpensesName, index)}
            placeholder="Operating expenses name"
            styleProps={{ inputClassName: "h-6 text-sm max-w-52 -mt-1.5" }}
          />
          <RHFTextInput
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
          isHideErrorMessage
          className="col-start-3 col-end-5 row-start-1 mt-0"
          label=""
          name={getArrayFieldName<
            FpOperatingExpensesField,
            FieldPath<FpOperatingExpensesFormValue>
          >(FpOperatingExpensesField.operatingExpensesStartDate, index)}
          pattern={MM_YYYY_PATTERN}
          placeholder="MM/YYYY"
        />
        <RHFCurrencyInput
          isHideErrorMessage
          className="col-start-5 col-end-7 row-start-1 mt-0"
          label=""
          name={getArrayFieldName<
            FpOperatingExpensesField,
            FieldPath<FpOperatingExpensesFormValue>
          >(FpOperatingExpensesField.operatingExpensesMonthlyCost, index)}
          prefixIcon="$"
          styleProps={{ inputClassName: "pl-7.5" }}
          suffixIcon={<span className="text-text-placeholder">/ mo</span>}
        />
      </div>

      {isRemovable ? (
        <div className="flex items-center justify-between">
          <Button
            className="h-auto p-0"
            tabIndex={-1}
            type="button"
            variant="ghost"
            onClick={onRemove}
          >
            <X className="size-5" />
          </Button>
        </div>
      ) : null}
    </div>
  )
}
