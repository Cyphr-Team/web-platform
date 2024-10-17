import { useBoolean } from "@/hooks"
import usePermissions from "@/hooks/usePermissions"
import { cn } from "@/lib/utils.ts"
import { ErrorWrapper } from "@/modules/loan-application/[module]-financial-projection/components/layouts/ErrorWrapper.tsx"
import { Drawer } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer.tsx"
import { IncomeStatementTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpIncomeStatementTemplate"
import { LabeledSwitch } from "@/modules/loan-application/[module]-financial-projection/components/molecules/LabeledSwitch.tsx"
import { getIncomeStatementData } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers"
import { useQueryFinancialProjectionForecast } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-results/useQueryFinancialProjectionForecast.ts"
import {
  ForecastPeriod,
  ForecastResultsResponse
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper.tsx"
import { get } from "lodash"
import { useMemo } from "react"
import { useParams } from "react-router-dom"

export function Component() {
  const { id: applicationId } = useParams()
  const { isWorkspaceAdmin } = usePermissions()

  const currentDetail = useBoolean(false)
  const monthlyDetail = useBoolean(false)

  const { data, isLoading } = useQueryFinancialProjectionForecast({
    applicationId: applicationId!,
    enabled: !!applicationId,
    isWorkspaceAdmin
  })

  const forecastResults = useMemo(
    () => data ?? ({} as ForecastResultsResponse),
    [data]
  )

  const annuallyData = useMemo(
    () => getIncomeStatementData(forecastResults, ForecastPeriod.ANNUALLY),
    [forecastResults]
  )
  const annuallyTimeStamp = useMemo(
    () =>
      get(
        forecastResults,
        "incomeStatementForecastAnnually[0].forecastData",
        []
      ).map((entry) => new Date(entry.forecastDate)),
    [forecastResults]
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

  const currentData = useMemo(
    () => getIncomeStatementData(forecastResults, ForecastPeriod.CURRENT),
    [forecastResults]
  )

  const isEmpty = forecastResults?.incomeStatementForecastAnnually?.length === 0

  return (
    <ErrorWrapper isError={isEmpty}>
      <div className="flex flex-col gap-y-2xl">
        <div className="w-full flex gap-2 justify-end items-center">
          <LabeledSwitch
            label="Current financial detail"
            state={currentDetail}
          />
          <LabeledSwitch
            label="Monthly forecast detail"
            state={monthlyDetail}
          />
          <Drawer />
        </div>

        <LoadingWrapper
          isLoading={isLoading}
          className={cn(
            isLoading
              ? "pb-10 gap-4 rounded-lg border bg-white min-h-40 flex items-center justify-center shadow-sm"
              : null
          )}
        >
          <div className="flex flex-col gap-y-6xl">
            {currentDetail.value ? (
              <IncomeStatementTemplate
                title="Current Income Statement"
                data={currentData}
                layout="current"
                period={ForecastPeriod.CURRENT}
                headerProps={{
                  title: "Income Statement",
                  // only get the first month
                  data: [monthlyTimeStamp[0]]
                }}
              />
            ) : null}

            <IncomeStatementTemplate
              layout="default"
              data={monthlyDetail.value ? monthlyData : annuallyData}
              period={
                monthlyDetail.value
                  ? ForecastPeriod.MONTHLY
                  : ForecastPeriod.ANNUALLY
              }
              headerProps={{
                title: "Income Statement",
                data: monthlyDetail.value ? monthlyTimeStamp : annuallyTimeStamp
              }}
            />
          </div>
        </LoadingWrapper>
      </div>
    </ErrorWrapper>
  )
}
