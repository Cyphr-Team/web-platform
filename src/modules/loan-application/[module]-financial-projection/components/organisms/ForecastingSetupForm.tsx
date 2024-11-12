import { Button } from "@/components/ui/button.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { RHFProvider } from "@/modules/form-template/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect.ts"
import {
  ForecastingSetupFormBlocks,
  forecastingSetupFormSchema,
  type ForecastingSetupFormValue
} from "@/modules/loan-application/[module]-financial-projection/types/forecasting-form.ts"
import { renderBlockComponents } from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"

export function ForecastingSetupForm() {
  const { forecastingSetup, dispatchFormAction } =
    useLoanApplicationFormContext()

  const form = useForm<ForecastingSetupFormValue>({
    resolver: zodResolver(forecastingSetupFormSchema),
    mode: "onBlur",
    defaultValues: forecastingSetup
  })

  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const onSubmit = (data: ForecastingSetupFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.FORECASTING_SETUP,
      state: data
    })
    finishCurrentStep()
  }

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.FORECASTING_SETUP)

  return (
    <FormLayout title="Forecasting Setup">
      <h5 className="text-lg font-semibold">Forecasting Setup</h5>
      <Separator />
      <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col gap-xl">
          {renderBlockComponents(ForecastingSetupFormBlocks)}
        </div>

        {!isReviewApplicationStep(step) && (
          <div className="flex flex-col gap-2xl">
            <Button disabled={!form.formState.isValid}>Next</Button>
          </div>
        )}
      </RHFProvider>
    </FormLayout>
  )
}
