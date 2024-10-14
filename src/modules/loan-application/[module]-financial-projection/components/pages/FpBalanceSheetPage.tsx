import {
  getDataPointsFactory,
  useQueryFinancialProjectionForecast
} from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-results/useQueryFinancialProjectionForecast.ts"
import { useMemo } from "react"
import { SectionRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/SectionRow.tsx"
import { DataRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DataRow.tsx"
import { Card } from "@/components/ui/card.tsx"
import { LabeledSwitch } from "@/modules/loan-application/[module]-financial-projection/components/molecules/LabeledSwitch.tsx"
import { useBoolean } from "@/hooks"
import { cn } from "@/lib/utils.ts"
import {
  ForecastPeriod,
  ForecastResultsResponse,
  ForecastType
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { ForecastRowData } from "@/modules/loan-application/[module]-financial-projection/types"
import {
  HeaderMapper,
  HeaderProps
} from "@/modules/loan-application/[module]-financial-projection/constants"
import { get } from "lodash"
import { useParams } from "react-router-dom"
import usePermissions from "@/hooks/usePermissions"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper.tsx"
import { ErrorWrapper } from "@/modules/loan-application/[module]-financial-projection/components/layouts/ErrorWrapper.tsx"
import { Drawer } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer.tsx"

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
      ).map((entry) => new Date(entry.forecastDate)),
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

  const isEmpty = forecastResults?.balanceSheetForecastAnnually?.length === 0

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
              <BalanceSheetTemplate
                title="Current Balance Sheet"
                data={currentData}
                layout="current"
                period={ForecastPeriod.CURRENT}
                headerProps={{
                  title: "Balance Sheet",
                  // only get the first month
                  data: [monthlyTimeStamp[0]]
                }}
              />
            ) : null}

            <BalanceSheetTemplate
              layout="default"
              data={monthlyDetail.value ? monthlyData : annuallyData}
              period={
                monthlyDetail.value
                  ? ForecastPeriod.MONTHLY
                  : ForecastPeriod.ANNUALLY
              }
              headerProps={{
                title: "Balance Sheet",
                data: monthlyDetail.value ? monthlyTimeStamp : annuallyTimeStamp
              }}
            />
          </div>
        </LoadingWrapper>
      </div>
    </ErrorWrapper>
  )
}

interface BalanceSheetTemplateProps {
  title?: string
  data: ForecastRowData
  layout: "default" | "current"
  period: ForecastPeriod
  headerProps: HeaderProps
  isPdf?: boolean
}

export const BalanceSheetTemplate = (props: BalanceSheetTemplateProps) => {
  const {
    title = "Balance Sheet",
    layout,
    period,
    headerProps,
    data,
    isPdf = false
  } = props
  const HeaderComponent = HeaderMapper[period]

  return (
    <div className="flex flex-col gap-y-2xl">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <Card
        className={cn(
          isPdf ? null : "shadow-primary",
          "rounded-xl flex flex-col",
          layout === "current" ? "w-fit" : null
        )}
      >
        <div className="overflow-x-auto overflow-y-visible">
          <div
            className={cn(
              "bg-white rounded-xl",
              layout === "default" ? "min-w-max" : "w-fit"
            )}
          >
            <HeaderComponent {...headerProps} />

            <SectionRow title="Assets" />
            <DataRow
              title="Cash"
              data={data[ForecastType.CASH]}
              layout="item"
            />
            <DataRow
              title="Account Receivables"
              data={data[ForecastType.ACCOUNT_RECEIVABLE]}
              collision
              layout="item"
            />
            <DataRow
              title="Total Current Assets"
              data={data[ForecastType.TOTAL_CURRENT_ASSETS]}
              layout="total"
            />
            <DataRow
              title="Fixed Assets"
              data={data[ForecastType.FIXED_ASSET]}
              collision
              layout="item"
            />
            <DataRow
              title="Accumulated Depreciation"
              data={data[ForecastType.ACCUMULATED_DEPRECIATION]}
              layout="item"
            />
            <DataRow
              title="Total Assets"
              data={data[ForecastType.TOTAL_ASSETS]}
              layout="item"
            />

            <SectionRow
              title="Liabilities & Owner’s Equity"
              className="border-y"
            />
            <SectionRow
              title="Liabilities"
              className="h-6 italic font-normal border-y-0"
            />
            <DataRow
              title="Long Term Debt"
              data={data[ForecastType.LONG_TERM_DEBT]}
              layout="item"
            />
            <DataRow
              title="Accounts Payable"
              data={data[ForecastType.ACCOUNT_PAYABLE]}
              layout="item"
            />
            <DataRow
              title="Total Liabilities"
              data={data[ForecastType.TOTAL_LIABILITIES]}
              layout="subTotal"
            />
            <SectionRow
              title="Equity"
              className="h-6 italic font-normal border-b-0"
            />
            <DataRow
              title="Paid in Capital"
              data={data[ForecastType.PAID_IN_CAPITAL]}
              layout="item"
            />
            <DataRow
              title="Accumulated Retained Earnings"
              data={data[ForecastType.ACCUMULATED_RETAINED_EARNINGS]}
              layout="item"
            />
            <DataRow
              title="Total Equity"
              data={data[ForecastType.TOTAL_EQUITY]}
              layout="total"
              collision
            />
            <DataRow
              title="Total Liabilities & Owners Equity"
              data={data[ForecastType.TOTAL_LIABILITY_AND_EQUITY]}
              layout="total"
              isEnd
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export function getBalanceSheetData(
  dataSource: ForecastResultsResponse,
  period: ForecastPeriod
): ForecastRowData {
  const dataPoints = [
    ForecastType.ACCOUNT_PAYABLE,
    ForecastType.ACCOUNT_RECEIVABLE,
    ForecastType.ACCUMULATED_DEPRECIATION,
    ForecastType.ACCUMULATED_RETAINED_EARNINGS,
    ForecastType.CASH,
    ForecastType.FIXED_ASSET,
    ForecastType.PAID_IN_CAPITAL,
    ForecastType.TOTAL_ASSETS,
    ForecastType.TOTAL_CURRENT_ASSETS,
    ForecastType.LONG_TERM_DEBT,
    ForecastType.TOTAL_EQUITY,
    ForecastType.TOTAL_LIABILITIES,
    ForecastType.TOTAL_LIABILITY_AND_EQUITY
  ]

  return getDataPointsFactory({
    dataSource,
    dataPoints,
    period,
    sheetName: "balanceSheetForecast"
  })
}
