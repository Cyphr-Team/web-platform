import { cn } from "@/lib/utils"
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
  OperatingExpensesFormValue
} from "../../../../constants/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FORM_ACTION } from "../../../../providers/LoanApplicationFormProvider"
import { useEffect, useMemo, useState } from "react"
import { toCurrency } from "@/utils"
import { Input } from "@/components/ui/input"
import { LOAN_APPLICATION_STEPS } from "../../../../models/LoanApplicationStep/type"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { OPERATING_EXPENSES_FIELD_DATA } from "@/modules/loan-application/constants/type"

export const OperatingExpensesForm = () => {
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
  }, [
    operatingExpensesForm?.accountingFees,
    operatingExpensesForm?.bankCharges,
    operatingExpensesForm?.costOfGoodsSold,
    operatingExpensesForm?.depreciation,
    operatingExpensesForm?.duesAndSubscriptions,
    operatingExpensesForm?.id,
    operatingExpensesForm?.insurance,
    operatingExpensesForm?.legalFees,
    operatingExpensesForm?.maintenanceAndRepairs,
    operatingExpensesForm?.officeSupplies,
    operatingExpensesForm?.otherOperatingExpenses,
    operatingExpensesForm?.payrollTaxes,
    operatingExpensesForm?.rent,
    operatingExpensesForm?.salariesAndWages,
    operatingExpensesForm?.salesAndMarketingExpenses,
    operatingExpensesForm?.travelAndEntertainment,
    operatingExpensesForm?.utilities
  ])

  const form = useForm<OperatingExpensesFormValue>({
    resolver: zodResolver(operatingExpensesFormSchema),
    defaultValues,
    mode: "onBlur"
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
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <Form {...form}>
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
            <h5 className="text-lg font-semibold">
              Operating Expenses (monthly)
            </h5>
            <p className="text-sm text-text-secondary font-medium">
              Operating Expenses are costs directly related to the day-to-day
              functioning of your business. Please specify the amount for the
              expense categories below. For categories which don’t apply, please
              leave them blank.
            </p>
            <p className="text-sm text-text-tertiary font-medium">
              (Note: This form excludes Non-Operating expenses such as Interest
              Expense, Income Taxes, Losses from Asset Sales, Foreign Exchange
              Losses, and Litigation Costs)
            </p>
            <Separator />
            <form className="grid grid-cols-6 gap-y-8xl xl:gap-y-4xl mb-3">
              {OPERATING_EXPENSES_FIELD_DATA.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem className="col-span-6 grid grid-cols-1 xl:grid-cols-2 gap-y-1 xl:gap-y-0 gap-x-2xl flex-auto xl:h-10">
                      <FormLabel className="text-text-secondary">
                        <p className="text-sm text-text-secondary font-semibold">
                          {item.title}
                        </p>
                        <p className="text-sm text-text-tertiary font-medium leading-4 mt-1">
                          {item.subtitle}
                        </p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={item.name}
                          placeholder="i.e: 5,000"
                          suffixIcon={
                            <span className="text-text-tertiary/75 -mt-4">
                              / mo
                            </span>
                          }
                          min={0}
                          className="text-base input-number-remove-arrow -mt-2 mb-2 ml-auto xl:max-w-80"
                          value={toCurrency(field.value, 0)}
                          onChange={(e) => {
                            field.onBlur()
                            const value =
                              parseFloat(
                                e.target.value.replace(/[^0-9.]/g, "")
                              ) || 0
                            if (isNaN(value)) return
                            field.onChange(value)
                          }}
                          onBlur={(e) => {
                            field.onBlur()
                            const value = parseFloat(
                              e.target.value.replace(/[^0-9.]/g, "")
                            )
                            if (isNaN(value)) return
                            return field.onChange(value)
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
            <div className="container grid grid-cols-1 xl:grid-cols-2 justify-space-between p-0">
              <p className="font-bold">TOTAL MONTHLY OPERATING EXPENSE</p>
              <p className="font-bold xl:ml-auto xl:mr-0">
                {toCurrency(Math.round(totalExpenses), 0)}/ mo
              </p>
            </div>
          </Card>
          {!isReviewApplicationStep(step) && (
            <Button
              disabled={!form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}
            >
              Next <ArrowRight className="ml-1 w-4" />
            </Button>
          )}
        </Form>
      </div>
    </div>
  )
}
