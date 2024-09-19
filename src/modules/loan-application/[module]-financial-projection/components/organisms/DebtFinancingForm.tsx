import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { RHFProvider } from "@/modules/form-template/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"

import { renderBlockComponents } from "@/modules/form-template/components/templates/FormTemplate.tsx"
import {
  DEBT_FINANCING_DEFAULT_VALUE,
  DebtFinancingArrayFormBlocks,
  DebtFinancingField,
  DebtFinancingFormBlocks,
  DebtFinancingFormSchema,
  DebtFinancingFormValue,
  EMPTY_DEBT_FINANCING_ITEM,
  LiabilityFormBlocks
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing"
import EquityArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/EquityArrayFormTemplate"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { Plus } from "lucide-react"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"

export const DebtFinancingForm = () => {
  const { debtFinancing, dispatchFormAction } = useLoanApplicationFormContext()

  const form = useForm<DebtFinancingFormValue>({
    resolver: zodResolver(DebtFinancingFormSchema),
    mode: "onBlur",
    defaultValues: debtFinancing ?? DEBT_FINANCING_DEFAULT_VALUE
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
    <div
      className={cn(
        "flex flex-col col-span-8 mx-4 h-full overflow-auto flex-1",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <RHFProvider methods={form} onSubmit={onSubmit}>
        <div
          className={cn(
            "flex flex-col rounded-lg h-fit overflow-auto col-span-8 shadow-none text-sm gap-6"
          )}
        >
          <DebtFinancingLiabilityForm />

          <DebtFinancingArrayForm />
        </div>
      </RHFProvider>
    </div>
  )
}

export const DebtFinancingLiabilityForm = () => {
  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl rounded-lg h-fit overflow-auto col-span-8 shadow-none text-sm p-4xl"
      )}
    >
      <div>
        <h5 className="text-lg font-semibold">Accounts Payable</h5>
        <h5 className="text-sm font-normal mt-2">
          Liabilities represent the financial obligations your business owes,
          including amounts owed by customers for past credit sales.
          Understanding how much is owed and the time frame for collection is
          crucial for managing your cash flow and financial stability
        </h5>
      </div>

      <Separator />

      {renderBlockComponents(LiabilityFormBlocks)}
    </Card>
  )
}

export const DebtFinancingArrayForm = () => {
  const { dispatchFormAction } = useLoanApplicationFormContext()

  const form = useFormContext<DebtFinancingFormValue>()

  const onAutoSave = () => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.DEBT_FINANCING,
      state: form.getValues()
    })
  }

  const isHaveOutStandingLoans =
    form.watch(DebtFinancingField.HAS_OUTSTANDING_LOANS) === BINARY_VALUES.YES

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl rounded-lg h-fit overflow-auto col-span-8 shadow-none text-sm p-4xl"
      )}
    >
      <div>
        <h5 className="text-lg font-semibold">Debt Financing</h5>
        <h5 className="text-sm font-normal mt-2">
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
            fieldName={DebtFinancingField.DEBT_FINANCING}
            dataName="Loan"
            addIcon={<Plus />}
            defaultEmptyObject={EMPTY_DEBT_FINANCING_ITEM}
            onBlur={onAutoSave}
            blocks={DebtFinancingArrayFormBlocks}
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-2xl">
        <Button>Next</Button>
      </div>
    </Card>
  )
}
