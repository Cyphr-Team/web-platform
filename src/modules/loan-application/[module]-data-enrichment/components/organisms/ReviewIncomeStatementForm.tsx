import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useParams } from "react-router-dom"
import { useQueryHistoricalStatement } from "@/modules/loan-application/[module]-data-enrichment/hooks/historical-statements/useQueryHistoricalStatement.ts"
import HistoricalIncomeStatementTemplate from "@/modules/loan-application/[module]-data-enrichment/components/templates/HistoricalIncomeStatementTemplate.tsx"
import { isEnableHistoricalFinancialsEnrichment } from "@/utils/feature-flag.utils.ts"

export function ReviewIncomeStatementForm() {
  const { finishCurrentStep, step, goToPreviousStep } =
    useLoanApplicationProgressContext()

  const { id: applicationId } = useParams()
  const { data, isLoading } = useQueryHistoricalStatement({
    applicationId: applicationId!,
    enabled: !!applicationId && isEnableHistoricalFinancialsEnrichment(),
    isPreview: true
  })

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

      <HistoricalIncomeStatementTemplate
        includeDownloadReports={false}
        includeTitle={false}
        incomeStatementData={data?.incomeStatement ?? []}
        isLoading={isLoading}
      />

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
