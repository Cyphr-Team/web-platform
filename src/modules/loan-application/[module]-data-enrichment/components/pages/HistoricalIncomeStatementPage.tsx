import usePermissions from "@/hooks/usePermissions"
import { cn } from "@/lib/utils.ts"
import { ErrorWrapper } from "@/modules/loan-application/[module]-financial-projection/components/layouts/ErrorWrapper.tsx"
import { Drawer } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer.tsx"
import { IncomeStatementTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpIncomeStatementTemplate"
import { getIncomeStatementData } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers"
import { useQueryFinancialProjectionForecast } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-results/useQueryFinancialProjectionForecast.ts"
import {
  ForecastPeriod,
  type ForecastResultsResponse
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper.tsx"
import { get } from "lodash"
import { useMemo } from "react"
import { useParams } from "react-router-dom"

export function Component() {
  const { id: applicationId } = useParams()
  const { isWorkspaceAdmin } = usePermissions()

  // TODO: Integrate API call to get historical income statement results
  const { data, isLoading } = useQueryFinancialProjectionForecast({
    applicationId: applicationId!,
    enabled: !!applicationId,
    isWorkspaceAdmin
  })

  const forecastResults = useMemo(
    () => data ?? ({} as ForecastResultsResponse),
    [data]
  )

  const monthlyData = useMemo(
    () => getIncomeStatementData(forecastResults, ForecastPeriod.MONTHLY),
    [forecastResults]
  )
  const monthlyTimeStamp = useMemo(
    () =>
      get(
        forecastResults,
        "incomeStatementForecastMonthly[0].forecastData",
        []
      ).map((entry) => new Date(entry.forecastDate)),
    [forecastResults]
  )

  return (
    <ErrorWrapper isError={!forecastResults?.incomeStatementForecastMonthly}>
      <div className="flex flex-col gap-y-2xl">
        <div className="flex w-full items-center justify-end gap-2">
          <Drawer />
        </div>

        <LoadingWrapper
          className={cn(
            isLoading
              ? "flex min-h-40 items-center justify-center gap-4 rounded-lg border bg-white pb-10 shadow-sm"
              : null
          )}
          isLoading={isLoading}
        >
          <div className="flex flex-col gap-y-6xl">
            <IncomeStatementTemplate
              data={monthlyData}
              headerProps={{
                title: "Income Statement",
                data: monthlyTimeStamp
              }}
              layout="default"
              period={ForecastPeriod.MONTHLY}
            />
          </div>
        </LoadingWrapper>
      </div>
    </ErrorWrapper>
  )
}
