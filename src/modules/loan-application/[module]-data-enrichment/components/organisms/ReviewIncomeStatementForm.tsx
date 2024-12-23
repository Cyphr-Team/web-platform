import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IncomeStatementTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpIncomeStatementTemplate"
import { getIncomeStatementData } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers"
import {
  type ForecastDataCategory,
  ForecastPeriod
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useMemo } from "react"
import { get } from "lodash"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper.tsx"
import { cn } from "@/lib/utils"
import { MOCK_HISTORICAL_INCOME_STATEMENT_DATA } from "@/modules/loan-application/[module]-data-enrichment/components/store/mock-data"

export function ReviewIncomeStatementForm() {
  const { finishCurrentStep, step, goToPreviousStep } =
    useLoanApplicationProgressContext()

  // TODO: Integrate API call to get 3-month forecast results
  const isLoading = false
  const data = MOCK_HISTORICAL_INCOME_STATEMENT_DATA

  const forecastResults = useMemo(
    () => data ?? ([] as ForecastDataCategory[]),
    [data]
  )

  const monthlyData = useMemo(
    () => getIncomeStatementData(forecastResults.data, ForecastPeriod.MONTHLY),
    [forecastResults]
  )
  const monthlyTimeStamp = useMemo(
    () =>
      get(forecastResults, "data[0].forecastData", []).map(
        (entry) => new Date(entry.forecastDate)
      ),
    [forecastResults]
  )

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
      <LoadingWrapper
        className={cn(
          isLoading
            ? "flex min-h-40 items-center justify-center gap-4 rounded-lg border bg-white pb-10 shadow-sm"
            : null
        )}
        isLoading={isLoading}
      >
        <IncomeStatementTemplate
          data={monthlyData}
          headerProps={{
            title: "Income Statement",
            data: monthlyTimeStamp
          }}
          layout="default"
          period={ForecastPeriod.MONTHLY}
          title=""
        />
      </LoadingWrapper>

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
