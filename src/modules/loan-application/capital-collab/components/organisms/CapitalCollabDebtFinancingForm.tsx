import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { RHFProvider } from "@/modules/form-template/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"

import { renderBlockComponents } from "@/modules/form-template/components/templates/FormTemplate.tsx"
import {
  DebtFinancingArrayFormBlocks,
  DebtFinancingField,
  DebtFinancingFormBlocks,
  EMPTY_DEBT_FINANCING_ITEM,
  LiabilityFormBlocks
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing"
import EquityArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/EquityArrayFormTemplate"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { Plus } from "lucide-react"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import {
  capitalCollabDebtFinancingFormSchema,
  DEBT_FINANCING_DEFAULT_VALUE,
  type CapitalCollabDebtFinancingFormValue
} from "@/modules/loan-application/capital-collab/stores/debt-financing-store"

const getDefaultValue = (data: CapitalCollabDebtFinancingFormValue) => {
  if (!data || !data[DebtFinancingField.DebtFinancing])
    return DEBT_FINANCING_DEFAULT_VALUE
  if (data[DebtFinancingField.DebtFinancing].length == 0)
    return {
      ...data,
      [DebtFinancingField.DebtFinancing]: [EMPTY_DEBT_FINANCING_ITEM]
    }

  return data
}

export function CapitalCollabDebtFinancingForm() {
  const { debtFinancing, dispatchFormAction } = useLoanApplicationFormContext()

  const form = useForm<CapitalCollabDebtFinancingFormValue>({
    resolver: zodResolver(capitalCollabDebtFinancingFormSchema),
    mode: "onBlur",
    defaultValues: getDefaultValue(debtFinancing)
  })

  const { finishCurrentStep } = useLoanApplicationProgressContext()

  const onSubmit = form.handleSubmit((data) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.DEBT_FINANCING,
      state: data
    })
    finishCurrentStep()
  })

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.DEBT_FINANCING)

  return (
    <FormLayout
      hideTopNavigation
      cardClassName="border-0 !p-0 md:p-0"
      wrapperClassName="m-0 p-0"
    >
      <RHFProvider methods={form} onSubmit={onSubmit}>
        <div
          className={cn(
            "col-span-8 flex h-fit flex-col gap-6 overflow-auto rounded-lg text-sm shadow-none"
          )}
        >
          <DebtFinancingLiabilityForm />

          <DebtFinancingArrayForm />
        </div>
      </RHFProvider>
    </FormLayout>
  )
}

export function DebtFinancingLiabilityForm() {
  return (
    <FormLayout title="Debt Financing">
      <div>
        <h5 className="text-lg font-semibold">Accounts Payable</h5>
        <h5 className="financial-projection mt-2 text-sm font-normal text-muted-foreground">
          Liabilities represent the financial obligations your business owes,
          including amounts owed by customers for past credit sales.
          Understanding how much is owed and the timeframe for collection is
          crucial for managing your cash flow and financial stability
        </h5>
      </div>

      <Separator />

      {renderBlockComponents(LiabilityFormBlocks)}
    </FormLayout>
  )
}

export function DebtFinancingArrayForm() {
  const { dispatchFormAction } = useLoanApplicationFormContext()
  const { step } = useLoanApplicationProgressContext()

  const form = useFormContext<CapitalCollabDebtFinancingFormValue>()

  const onAutoSave = () => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.DEBT_FINANCING,
      state: form.getValues()
    })
  }

  const isHaveOutStandingLoans =
    form.watch(DebtFinancingField.HasOutstandingLoans) === BINARY_VALUES.YES

  return (
    <FormLayout hideTopNavigation>
      <div>
        <h5 className="text-lg font-semibold">Debt Financing</h5>
        <h5 className="financial-projection mt-2 text-sm font-normal text-muted-foreground">
          Debt financing, including loan financing, involves borrowing money
          that you agree to repay over time with interest. This option provides
          immediate funds while allowing you to retain full ownership of your
          business, but it also adds a financial obligation with regular
          payments that must be met, impacting your cash flow.
        </h5>
      </div>
      <Separator />

      {renderBlockComponents(DebtFinancingFormBlocks)}

      {isHaveOutStandingLoans ? (
        <div className="flex flex-col gap-6">
          <EquityArrayFormTemplate
            addIcon={<Plus />}
            blocks={DebtFinancingArrayFormBlocks}
            dataName="New Loan"
            defaultEmptyObject={EMPTY_DEBT_FINANCING_ITEM}
            fieldName={DebtFinancingField.DebtFinancing}
            onBlur={onAutoSave}
          />
        </div>
      ) : null}

      {!isReviewApplicationStep(step) && (
        <div className="flex flex-col gap-2xl">
          <Button disabled={!form.formState.isValid} type="submit">
            Next
          </Button>
        </div>
      )}
    </FormLayout>
  )
}
