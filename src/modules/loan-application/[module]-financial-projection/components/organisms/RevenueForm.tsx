import { Button } from "@/components/ui/button.tsx"
import { Card } from "@/components/ui/card.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { cn } from "@/lib/utils.ts"
import { RHFProvider } from "@/modules/form-template/providers"
import { useForm } from "react-hook-form"

import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect.ts"
import { useState } from "react"
import BillableHoursForm from "@/modules/loan-application/[module]-financial-projection/components/molecules/BillableHoursForm.tsx"
import RecurringChargesForm from "@/modules/loan-application/[module]-financial-projection/components/molecules/RecurringChargesForm.tsx"
import ContractRevenueForm from "@/modules/loan-application/[module]-financial-projection/components/molecules/ContractRevenueForm.tsx"
import UnitSalesForm from "@/modules/loan-application/[module]-financial-projection/components/molecules/UnitSalesForm.tsx"
import { useBoolean } from "@/hooks"
import { AddRevenueTypeDialog } from "@/modules/loan-application/[module]-financial-projection/components/molecules/AddRevenueTypeDialog.tsx"
import { RevenueTypeSelection } from "@/modules/loan-application/[module]-financial-projection/components/molecules/RevenueTypeSelection.tsx"

export const enum RevenueType {
  UNIT_SALES = "UNIT_SALES",
  BILLABLE_HOURS = "BILLABLE_HOURS",
  RECURRING_CHARGES = "RECURRING_CHARGES",
  CONTRACT_REVENUE = "CONTRACT_REVENUE"
}

const formMapper = {
  [RevenueType.UNIT_SALES]: UnitSalesForm,
  [RevenueType.BILLABLE_HOURS]: BillableHoursForm,
  [RevenueType.RECURRING_CHARGES]: RecurringChargesForm,
  [RevenueType.CONTRACT_REVENUE]: ContractRevenueForm
}

export const RevenueForm = () => {
  const [currentFormType, setCurrentFormType] = useState<RevenueType[]>([])
  const dialog = useBoolean()

  const { dispatchFormAction } = useLoanApplicationFormContext()

  const form = useForm({
    mode: "onBlur"
  })

  const { finishCurrentStep } = useLoanApplicationProgressContext()

  const onSubmit = (data: object) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.REVENUE,
      state: data
    })
    finishCurrentStep()
  }

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.REVENUE)

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <h5 className="text-lg font-semibold">Revenue</h5>
      <div className="text-text-tertiary">
        Select one or more revenue models that best align with your business
        operations and financial reporting requirements.
      </div>
      <Separator />
      <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        {currentFormType.length === 0 ? (
          <RevenueTypeSelection
            currentFormType={currentFormType}
            setCurrentFormType={setCurrentFormType}
          />
        ) : null}

        {currentFormType.map((form) => {
          const Component = formMapper[form]
          return <Component key={form} />
        })}

        <AddRevenueTypeDialog
          setCurrentFormType={setCurrentFormType}
          currentFormType={currentFormType}
          open={dialog.value}
          onOpenChange={dialog.setValue}
          onConfirm={dialog.onFalse}
        />

        {currentFormType.length !== 0 ? (
          <div className="w-full flex flex-row-reverse">
            <Button type="button" className="py-2 my-2" onClick={dialog.onTrue}>
              + Another revenue type
            </Button>
          </div>
        ) : null}

        <div className="flex flex-col gap-2xl">
          <Button disabled={!form.formState.isValid}>Next</Button>
        </div>
      </RHFProvider>
    </Card>
  )
}
