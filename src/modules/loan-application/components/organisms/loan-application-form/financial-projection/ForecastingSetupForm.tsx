import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { RHFProvider } from "@/modules/form-template/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"

import { renderBlockComponents } from "@/modules/form-template/components/templates/FormTemplate.tsx"
import {
  ForecastingSetupFormBlocks,
  forecastingSetupFormSchema,
  ForecastingSetupFormValue
} from "@/modules/loan-application/[module]-financial-projection/types/forecasting-form"

export const ForecastingSetupForm = () => {
  const { forecastingSetup, dispatchFormAction } =
    useLoanApplicationFormContext()

  const form = useForm<ForecastingSetupFormValue>({
    resolver: zodResolver(forecastingSetupFormSchema),
    mode: "onBlur",
    defaultValues: forecastingSetup
  })

  const { finishCurrentStep } = useLoanApplicationProgressContext()

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
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <h5 className="text-lg font-semibold">Forecasting Setup</h5>
      <Separator />
      <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-xl mb-5">
          {renderBlockComponents(ForecastingSetupFormBlocks)}
        </div>

        <div className="flex flex-col gap-2xl">
          <Button disabled={!form.formState.isValid}>Next</Button>
        </div>
      </RHFProvider>
    </Card>
  )
}
