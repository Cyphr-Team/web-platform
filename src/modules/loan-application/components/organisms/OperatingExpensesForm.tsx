import { cn } from "@/lib/utils"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../providers"
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
} from "../../constants/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FORM_ACTION } from "../../providers/LoanApplicationFormProvider"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/constants"
import { useEffect, useMemo, useState } from "react"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { toCurrency } from "@/utils"
import { Input } from "@/components/ui/input"

type OperatingExpensesFieldDataType = {
  name:
    | "costOfGoodsSold"
    | "rent"
    | "salariesAndWages"
    | "payrollTaxes"
    | "salesAndMarketingExpenses"
    | "accountingFees"
    | "legalFees"
    | "officeSupplies"
    | "maintenanceAndRepairs"
    | "utilities"
    | "insurance"
    | "duesAndSubscriptions"
    | "travelAndEntertainment"
    | "depreciation"
    | "bankCharges"
    | "otherOperatingExpenses"
  title: string
  subtitle: string
}[]

const OPERATING_EXPENSES_FIELD_DATA: OperatingExpensesFieldDataType = [
  {
    name: "costOfGoodsSold",
    title: "Cost of Goods Sold (COGS)",
    subtitle: "Direct costs related to producing goods or services"
  },
  {
    name: "rent",
    title: "Rent",
    subtitle: "The cost of leasing office space or facilities"
  },
  {
    name: "salariesAndWages",
    title: "Salaries and Wages",
    subtitle: "Payments to employees and contractors"
  },
  {
    name: "payrollTaxes",
    title: "Payroll Taxes",
    subtitle:
      "Contributions for Social Security, Medicare, and unemployment insurance"
  },
  {
    name: "salesAndMarketingExpenses",
    title: "Sales and Marketing Expenses",
    subtitle: "Costs related to promoting and selling"
  },
  {
    name: "accountingFees",
    title: "Accounting Fees",
    subtitle: "Fees paid to accountants for financial services"
  },
  {
    name: "legalFees",
    title: "Legal Fees",
    subtitle: "Fees paid to lawyers for legal services"
  },
  {
    name: "officeSupplies",
    title: "Office Supplies",
    subtitle: "Expenses for stationery, printer ink, etc."
  },
  {
    name: "maintenanceAndRepairs",
    title: "Maintenance and Repairs",
    subtitle: "Costs incurred for maintaining equipment or facilities"
  },
  {
    name: "utilities",
    title: "Utilities",
    subtitle: "Electricity, water, and other utilities bills"
  },
  {
    name: "insurance",
    title: "Insurance",
    subtitle: "Costs to cover against unexpected damage"
  },
  {
    name: "duesAndSubscriptions",
    title: "Dues and Subscriptions",
    subtitle: "Recurring fees such as software licenses, membership dues, etc."
  },
  {
    name: "travelAndEntertainment",
    title: "Travel and Entertainment",
    subtitle: "Costs such as airfare, lodging, meals, transportation, etc"
  },
  {
    name: "depreciation",
    title: "Depreciation",
    subtitle: "The periodic conversion of assets' value into an expense"
  },
  {
    name: "bankCharges",
    title: "Bank Charges",
    subtitle: "Fees associated with banking services"
  },
  {
    name: "otherOperatingExpenses",
    title: "Other Operating Expenses",
    subtitle: "Expenses not already captured in the above categories"
  }
]

export const OperatingExpensesForm = () => {
  const { dispatchFormAction, operatingExpensesForm } =
    useLoanApplicationFormContext()
  const { finishCurrentStep } = useLoanApplicationProgressContext()
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
    mode: "onChange"
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

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <Form {...form}>
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
            <h5 className="text-lg font-semibold">Operating Expenses</h5>
            <p className="text-sm text-text-secondary font-medium">
              Operating Expenses are costs directly related to the day-to-day
              functioning of your business. Please specify the amount for the
              expense categories below. For categories which don't apply, please
              leave them blank.
            </p>
            <p className="text-sm text-text-tertiary font-medium">
              (Note: This form excludes Non-Operating expenses such as Interest
              Expense, Income Taxes, Losses from Asset Sales, Foreign Exchange
              Losses, and Litigation Costs)
            </p>
            <Separator />
            <form className="grid grid-cols-6 gap-y-8xl lg:gap-y-4xl mb-3">
              {OPERATING_EXPENSES_FIELD_DATA.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem className="col-span-6 grid grid-cols-1 lg:grid-cols-2 gap-y-1 lg:gap-y-0 gap-x-2xl flex-auto lg:h-10">
                      <FormLabel className="text-text-secondary">
                        <p className="text-sm text-text-secondary font-medium">
                          {item.title}
                          <RequiredSymbol />
                        </p>
                        <p className="text-sm text-text-tertiary font-medium leading-3">
                          {item.subtitle}
                        </p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={item.name}
                          placeholder="i.e: 5,000"
                          min={0}
                          className="text-base input-number-remove-arrow -mt-2 mb-2"
                          value={toCurrency(field.value, 0)}
                          required
                          onChange={(e) => {
                            const value =
                              parseFloat(
                                e.target.value.replace(/[^0-9.]/g, "")
                              ) || 0
                            if (isNaN(value)) return
                            field.onChange(value)
                          }}
                          onBlur={(e) => {
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
            <div className="container grid grid-cols-1 lg:grid-cols-2 justify-space-between p-0">
              <p className="font-bold">TOTAL MONTHLY OPERATING EXPENSE</p>
              <p className="font-bold lg:ml-auto lg:mr-0">
                {toCurrency(Math.round(totalExpenses), 0)}
                /mo
              </p>
            </div>
          </Card>
          <Button
            disabled={!form.formState.isValid}
            onClick={form.handleSubmit(onSubmit)}
          >
            Next <ArrowRight className="ml-1 w-4" />
          </Button>
        </Form>
      </div>
    </div>
  )
}
