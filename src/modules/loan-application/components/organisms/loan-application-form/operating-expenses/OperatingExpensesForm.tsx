import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../../../providers"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import {
  operatingExpensesFormSchema,
  type OperatingExpensesFormValue
} from "../../../../constants/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator"
import { FORM_ACTION } from "../../../../providers/LoanApplicationFormProvider"
import { useEffect, useMemo, useState } from "react"
import { toCurrency } from "@/utils"
import { Input } from "@/components/ui/input"
import { LOAN_APPLICATION_STEPS } from "../../../../models/LoanApplicationStep/type"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { OPERATING_EXPENSES_FIELD_DATA } from "@/modules/loan-application/constants/type"
import { FormSubmitButton } from "../../../atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"

export function OperatingExpensesForm() {
  const { dispatchFormAction, operatingExpensesForm } =
    useLoanApplicationFormContext()
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const [totalExpenses, setTotalExpenses] = useState(0)

  const defaultValues = useMemo(() => {
    return {
      id: operatingExpensesForm?.id ?? "",
      costOfGoodsSold: operatingExpensesForm?.costOfGoodsSold ?? 0,
      rent: operatingExpensesForm?.rent ?? 0,
      salariesAndWages: operatingExpensesForm?.salariesAndWages ?? 0,
      payrollTaxes: operatingExpensesForm?.payrollTaxes ?? 0,
      salesAndMarketingExpenses:
        operatingExpensesForm?.salesAndMarketingExpenses ?? 0,
      accountingFees: operatingExpensesForm?.accountingFees ?? 0,
      legalFees: operatingExpensesForm?.legalFees ?? 0,
      officeSupplies: operatingExpensesForm?.officeSupplies ?? 0,
      maintenanceAndRepairs: operatingExpensesForm?.maintenanceAndRepairs ?? 0,
      utilities: operatingExpensesForm?.utilities ?? 0,
      insurance: operatingExpensesForm?.insurance ?? 0,
      duesAndSubscriptions: operatingExpensesForm?.duesAndSubscriptions ?? 0,
      travelAndEntertainment:
        operatingExpensesForm?.travelAndEntertainment ?? 0,
      depreciation: operatingExpensesForm?.depreciation ?? 0,
      bankCharges: operatingExpensesForm?.bankCharges ?? 0,
      otherOperatingExpenses: operatingExpensesForm?.otherOperatingExpenses ?? 0
    }
  }, [operatingExpensesForm])

  const form = useForm<OperatingExpensesFormValue>({
    resolver: zodResolver(operatingExpensesFormSchema),
    defaultValues,
    mode: "onBlur",
    values: defaultValues
  })

  const onSubmit = (data: OperatingExpensesFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.OPERATING_EXPENSES,
      state: data
    })
    finishCurrentStep()
  }

  useEffect(() => {
    const { id, ...expenses } = form.getValues()
    const newExpenses = Object.values(expenses).reduce((a, b) => a + b, 0)

    setTotalExpenses(newExpenses)
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.OPERATING_EXPENSES,
      state: { id, ...expenses }
    })
  }, [form.formState.isValidating, form, dispatchFormAction, setTotalExpenses])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.OPERATING_EXPENSES)

  return (
    <FormLayout title="Operating Expenses (monthly)">
      <Form {...form}>
        <h5 className="text-lg font-semibold">Operating Expenses (monthly)</h5>
        <p className="text-sm font-medium text-text-secondary">
          Operating Expenses are costs directly related to the day-to-day
          functioning of your business. Please specify the amount for the
          expense categories below. For categories which don’t apply, please
          leave them blank.
        </p>
        <p className="text-sm font-medium text-text-tertiary">
          (Note: This form excludes Non-Operating expenses such as Interest
          Expense, Income Taxes, Losses from Asset Sales, Foreign Exchange
          Losses, and Litigation Costs)
        </p>
        <Separator />
        <form className="gap-y-8xl mb-3 grid grid-cols-6 xl:gap-y-4xl">
          {OPERATING_EXPENSES_FIELD_DATA.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem className="col-span-6 grid flex-auto grid-cols-1 gap-x-2xl gap-y-1 xl:h-10 xl:grid-cols-2 xl:gap-y-0">
                  <FormLabel className="text-text-secondary">
                    <p className="text-sm font-semibold text-text-secondary">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm font-medium leading-4 text-text-tertiary">
                      {item.subtitle}
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="input-number-remove-arrow -mt-2 mb-2 ml-auto text-base xl:max-w-80"
                      min={0}
                      placeholder="i.e: 5,000"
                      suffixIcon={
                        <span className="-mt-4 text-text-tertiary/75">
                          / mo
                        </span>
                      }
                      type={item.name}
                      value={toCurrency(field.value, 0)}
                      onBlur={(e) => {
                        field.onBlur()
                        const value = parseFloat(
                          e.target.value.replace(/[^0-9.]/g, "")
                        )

                        if (isNaN(value)) return

                        return field.onChange(value)
                      }}
                      onChange={(e) => {
                        field.onBlur()
                        const value =
                          parseFloat(e.target.value.replace(/[^0-9.]/g, "")) ||
                          0

                        if (isNaN(value)) return
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                  <FormMessage style={{ marginTop: -1 }} />
                </FormItem>
              )}
            />
          ))}
        </form>
        <Separator />
        <div className="justify-space-between container grid grid-cols-1 p-0 xl:grid-cols-2">
          <p className="font-bold">TOTAL MONTHLY OPERATING EXPENSE</p>
          <p className="font-bold xl:ml-auto xl:mr-0">
            {toCurrency(Math.round(totalExpenses), 0)}/ mo
          </p>
        </div>
        {!isReviewApplicationStep(step) && (
          <FormSubmitButton
            isDisabled={!form.formState.isValid}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        )}
      </Form>
    </FormLayout>
  )
}
