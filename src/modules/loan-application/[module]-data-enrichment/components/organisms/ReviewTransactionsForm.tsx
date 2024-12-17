import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RHFProvider } from "@/modules/form-template/providers"
import {
  TRANSACTIONS_DEFAULT_VALUE,
  TransactionsFormSchema,
  type TransactionsFormValue
} from "@/modules/loan-application/[module]-data-enrichment/components/store/transactions-store"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export function ReviewTransactionsForm() {
  const { dispatchFormAction } = useLoanApplicationFormContext()

  const form = useForm<TransactionsFormValue>({
    resolver: zodResolver(TransactionsFormSchema),
    mode: "onBlur",
    defaultValues: TRANSACTIONS_DEFAULT_VALUE
  })

  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const onSubmit = form.handleSubmit((data) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.REVIEW_TRANSACTIONS,
      state: data
    })
    finishCurrentStep()
  })

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.REVIEW_TRANSACTIONS)

  return (
    <FormLayout title="Review Transactions">
      <div className="flex flex-col gap-4">
        <h5 className="text-lg font-semibold">Review Transactions</h5>
        <p className="financial-projection text-sm text-muted-foreground">
          After connecting your bank accounts, you'll see your top lump sum of
          transactions organized by category. Please review the transactions
          below and make any necessary updates.
        </p>
      </div>
      <Separator />
      <RHFProvider methods={form} onSubmit={onSubmit}>
        {!isReviewApplicationStep(step) && (
          <div className="mt-4 flex flex-row gap-2xl justify-end">
            <Button disabled={!form.formState.isValid}>Looks good</Button>
          </div>
        )}
      </RHFProvider>
    </FormLayout>
  )
}
