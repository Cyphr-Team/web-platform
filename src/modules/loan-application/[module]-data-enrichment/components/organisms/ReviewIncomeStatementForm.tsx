import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { isReviewApplicationStep } from "@/modules/loan-application/services"

export function ReviewIncomeStatementForm() {
  const { finishCurrentStep, step, goToPreviousStep } =
    useLoanApplicationProgressContext()

  return (
    <FormLayout title="Review Financial Overview">
      <div className="flex flex-col gap-4">
        <h5 className="text-lg font-semibold">Review Financial Overview</h5>
        <p className="financial-projection text-sm text-muted-foreground">
          Please review your financial overview to ensure everything is accurate
          before moving on to the next sections.
        </p>
      </div>
      <Separator />
      {!isReviewApplicationStep(step) && (
        <div className="mt-4 flex flex-row gap-2xl justify-end">
          <Button variant="outline" onClick={goToPreviousStep}>
            Make changes
          </Button>
          <Button onClick={finishCurrentStep}>Looks good</Button>
        </div>
      )}
    </FormLayout>
  )
}
