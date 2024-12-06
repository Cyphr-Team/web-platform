import { Button } from "@/components/ui/button.tsx"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import { RHFProvider } from "@/modules/form-template/providers"
import { Separator } from "@/components/ui/separator.tsx"
import {
  type ExpenseTaxRateFormValue,
  taxRatesFormSchema
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-expense-tax-rate-store"
import { RHFNumberInput } from "@/modules/form-template/components/molecules"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { type FC } from "react"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"

export const TaxRateForm: FC = () => {
  const { taxRates, dispatchFormAction } = useLoanApplicationFormContext()
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const form = useForm<ExpenseTaxRateFormValue>({
    resolver: zodResolver(taxRatesFormSchema),
    mode: "onBlur",
    defaultValues: {
      applicationId: taxRates?.applicationId ?? "",
      incomeTaxRate: taxRates?.incomeTaxRate
    }
  })

  const onSubmit = form.handleSubmit((data: ExpenseTaxRateFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.TAX_RATES,
      state: data
    })
    finishCurrentStep()
  })

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.TAX_RATES)

  return (
    <FormLayout title="Tax Rates">
      <RHFProvider methods={form} onSubmit={onSubmit}>
        <div className="flex flex-col gap-2xl">
          <div className="p-y-2 flex flex-col gap-xl">
            <h5 className="text-lg font-semibold">Tax Rates</h5>
            <h5 className="financial-projection mt-2 text-sm font-normal text-muted-foreground">
              Income Tax: Enter a tax rate to cover income taxes (federal,
              state, local). A 20% rate is a good estimate. Taxes apply only
              when profitable, though unprofitable years may still incur some
              taxes.
            </h5>
          </div>

          <Separator />
          <RHFNumberInput
            isHideErrorMessage
            className="flex items-center justify-between"
            label="Estimate your income tax rate:"
            name="incomeTaxRate"
            placeholder="Income tax rate"
            styleProps={{
              labelClassName: "text-text-secondary",
              inputClassName: "text-sm w-64 no-arrows pr-8"
            }}
            suffixIcon="%"
          />

          {!isReviewApplicationStep(step) && (
            <div className="mt-4 flex flex-col gap-2xl">
              <Button disabled={!form.formState.isValid}>Next</Button>
            </div>
          )}
        </div>
      </RHFProvider>
    </FormLayout>
  )
}
