import { useBoolean } from "@/hooks"
import usePermissions from "@/hooks/usePermissions"
import { cn } from "@/lib/utils.ts"
import { ErrorWrapper } from "@/modules/loan-application/[module]-financial-projection/components/layouts/ErrorWrapper.tsx"
import { Drawer } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer"
import { BalanceSheetTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpBalanceSheetTemplate"
import { LabeledSwitch } from "@/modules/loan-application/[module]-financial-projection/components/molecules/LabeledSwitch.tsx"
import { getBalanceSheetData } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers"
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
    () => getBalanceSheetData(forecastResults, ForecastPeriod.ANNUALLY),
    [forecastResults]
  )
  const annuallyTimeStamp = useMemo(
    () =>
      get(
        forecastResults,
        "balanceSheetForecastAnnually[0].forecastData",
        []
      ).map((entry) => new Date(parseInt(entry.forecastDate), 5, 1)),
    [forecastResults]
  )

  const monthlyData = useMemo(
    () => getBalanceSheetData(forecastResults, ForecastPeriod.MONTHLY),
    [forecastResults]
  )
  const monthlyTimeStamp = useMemo(
    () =>
      get(
        forecastResults,
        "balanceSheetForecastMonthly[0].forecastData",
        []
      ).map((entry) => new Date(entry.forecastDate)),
    [forecastResults]
  )

  const currentData = useMemo(
    () => getBalanceSheetData(forecastResults, ForecastPeriod.CURRENT),
    [forecastResults]
  )

  return (
    <ErrorWrapper isError={!forecastResults?.balanceSheetForecastAnnually}>
      <div className="flex flex-col gap-y-2xl">
        <div className="flex w-full items-center justify-end gap-2">
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
          className={cn(
            isLoading
              ? "pb-10 gap-4 rounded-lg border bg-white min-h-40 flex items-center justify-center shadow-sm"
              : null
          )}
          isLoading={isLoading}
        >
          <div className="flex flex-col gap-y-6xl">
            {currentDetail.value ? (
              <BalanceSheetTemplate
                data={currentData}
                headerProps={{
                  title: "Balance Sheet",
                  // only get the first month
                  data: [monthlyTimeStamp[0]]
                }}
                layout="current"
                period={ForecastPeriod.CURRENT}
                title="Current Balance Sheet"
              />
            ) : null}

            <BalanceSheetTemplate
              data={monthlyDetail.value ? monthlyData : annuallyData}
              headerProps={{
                title: "Balance Sheet",
                data: monthlyDetail.value ? monthlyTimeStamp : annuallyTimeStamp
              }}
              layout="default"
              period={
                monthlyDetail.value
                  ? ForecastPeriod.MONTHLY
                  : ForecastPeriod.ANNUALLY
              }
            />
          </div>
        </LoadingWrapper>
      </div>
    </ErrorWrapper>
  )
}
