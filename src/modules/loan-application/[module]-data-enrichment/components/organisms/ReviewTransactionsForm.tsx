import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { TransactionTable } from "@/modules/loan-application/[module]-data-enrichment/components/molecules/TransactionTable.tsx"

export function ReviewTransactionsForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  return (
    <FormLayout layout="borderless" title="Review Transactions">
      <div className="flex flex-col gap-4">
        <h5 className="text-lg font-semibold">Review Transactions</h5>
        <p className="financial-projection text-sm text-muted-foreground">
          After connecting your bank accounts, you'll see your top lump sum of
          transactions organized by category. Please review the transactions
          below and make any necessary updates.
        </p>
      </div>
      <Separator />
      <TransactionTable />

      {!isReviewApplicationStep(step) && (
        <div className="mt-4 flex flex-row gap-2xl justify-end">
          <Button onClick={finishCurrentStep}>Looks good</Button>
        </div>
      )}
    </FormLayout>
  )
}
