import { useBoolean } from "@/hooks"
import usePermissions from "@/hooks/usePermissions"
import { cn } from "@/lib/utils.ts"
import { ErrorWrapper } from "@/modules/loan-application/[module]-financial-projection/components/layouts/ErrorWrapper.tsx"
import { Drawer } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer"
import { FpCashFlowTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpCashFlowTemplate"
import { LabeledSwitch } from "@/modules/loan-application/[module]-financial-projection/components/molecules/LabeledSwitch.tsx"
import { getCashFlowData } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers"
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
    () => getCashFlowData(forecastResults, ForecastPeriod.ANNUALLY),
    [forecastResults]
  )

  const annuallyTimeStamp = useMemo(
    () =>
      get(forecastResults, "cashFlowForecastAnnually[0].forecastData", []).map(
        (entry) => {
          // Take the middle month of the year to avoid timezone issues
          return new Date(parseInt(entry.forecastDate), 5, 1)
        }
      ),
    [forecastResults]
  )

  const monthlyData = useMemo(
    () => getCashFlowData(forecastResults, ForecastPeriod.MONTHLY),
    [forecastResults]
  )

  const monthlyTimeStamp = useMemo(
    () =>
      get(forecastResults, "cashFlowForecastMonthly[0].forecastData", []).map(
        (entry) => new Date(entry.forecastDate)
      ),
    [forecastResults]
  )

  const currentData = useMemo(
    () => getCashFlowData(forecastResults, ForecastPeriod.CURRENT),
    [forecastResults]
  )

  const renderHeaderActions = () => {
    return (
      <div className="flex w-full items-center justify-end gap-2">
        <LabeledSwitch label="Current financial detail" state={currentDetail} />
        <LabeledSwitch label="Monthly forecast detail" state={monthlyDetail} />
        <Drawer />
      </div>
    )
  }

  return (
    <ErrorWrapper isError={!forecastResults?.balanceSheetForecastAnnually}>
      <div className="flex flex-col gap-y-2xl">
        <LoadingWrapper
          className={cn(
            isLoading
              ? "flex min-h-40 items-center justify-center gap-4 rounded-lg border bg-white pb-10 shadow-sm"
              : null
          )}
          isLoading={isLoading}
        >
          <div className="flex flex-col gap-y-6xl">
            {currentDetail.value ? (
              <FpCashFlowTemplate
                data={currentData}
                headerProps={{
                  title: "Cash Flow",
                  // only get the first month
                  data: [monthlyTimeStamp[0]]
                }}
                layout="current"
                period={ForecastPeriod.CURRENT}
                renderHeaderActions={renderHeaderActions}
                title="Current Cash Flow Statement"
              />
            ) : null}

            <FpCashFlowTemplate
              data={monthlyDetail.value ? monthlyData : annuallyData}
              headerProps={{
                title: "Cash Flow",
                data: monthlyDetail.value ? monthlyTimeStamp : annuallyTimeStamp
              }}
              layout="default"
              period={
                monthlyDetail.value
                  ? ForecastPeriod.MONTHLY
                  : ForecastPeriod.ANNUALLY
              }
              renderHeaderActions={renderHeaderActions}
            />
          </div>
        </LoadingWrapper>
      </div>
    </ErrorWrapper>
  )
}
