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
import {
  HeaderMapper,
  HeaderProps
} from "@/modules/loan-application/[module]-financial-projection/constants"
import { ForecastRowData } from "@/modules/loan-application/[module]-financial-projection/types"
import { get } from "lodash"
import { useParams } from "react-router-dom"
import usePermissions from "@/hooks/usePermissions"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper.tsx"
import { ErrorWrapper } from "@/modules/loan-application/[module]-financial-projection/components/layouts/ErrorWrapper.tsx"
import { Drawer } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer.tsx"
import {
  getDataPointsFactory,
  useQueryFinancialProjectionForecast
} from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-results/useQueryFinancialProjectionForecast.ts"

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
        (entry) => new Date(entry.forecastDate)
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

  const isEmpty = forecastResults?.cashFlowForecastAnnually?.length === 0

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
              <FpCashFlowTemplate
                title="Current Cash Flow Statement"
                data={currentData}
                layout="current"
                period={ForecastPeriod.CURRENT}
                headerProps={{
                  title: "Cash Flow",
                  // only get the first month
                  data: [monthlyTimeStamp[0]]
                }}
              />
            ) : null}

            <FpCashFlowTemplate
              layout="default"
              data={monthlyDetail.value ? monthlyData : annuallyData}
              period={
                monthlyDetail.value
                  ? ForecastPeriod.MONTHLY
                  : ForecastPeriod.ANNUALLY
              }
              headerProps={{
                title: "Cash Flow",
                data: monthlyDetail.value ? monthlyTimeStamp : annuallyTimeStamp
              }}
            />
          </div>
        </LoadingWrapper>
      </div>
    </ErrorWrapper>
  )
}

interface FpCashFlowTemplateProps {
  title?: string
  data: ForecastRowData
  layout: "default" | "current"
  period: ForecastPeriod
  headerProps: HeaderProps
  isPdf?: boolean
}

export const FpCashFlowTemplate = (props: FpCashFlowTemplateProps) => {
  const {
    title = "Cash Flow Statement",
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
            <SectionRow title="Operating Cash Flow" />
            <DataRow
              title="Net Income"
              data={data[ForecastType.NET_INCOME]}
              layout="item"
            />
            <DataRow
              title="Depreciation"
              data={data[ForecastType.DEPRECIATION]}
              collision
              layout="item"
            />
            <DataRow
              title="Change in Accounts Receivable"
              data={data[ForecastType.CHANGE_IN_ACCOUNT_RECEIVABLE]}
              collision
              layout="item"
            />
            <DataRow
              title="Change in Accounts Payable"
              data={data[ForecastType.CHANGE_IN_ACCOUNT_PAYABLE]}
              collision
              layout="item"
            />
            <DataRow
              title="Total Operating Cash Flow"
              data={data[ForecastType.TOTAL_OPERATING_CASH_FLOWS]}
            />

            <SectionRow title="Investing Cash Flow" />
            <DataRow
              title="Changes in Fixed Assets"
              data={data[ForecastType.CHANGE_IN_FIXED_ASSET]}
              collision
              layout="item"
            />
            <DataRow
              title="Total Investing Cash Flow"
              data={data[ForecastType.TOTAL_INVESTING_CASH_FLOW]}
            />

            <SectionRow title="Financing Cash Flow" />
            <DataRow
              title="Long Term Debt"
              data={data[ForecastType.LONG_TERM_DEBT]}
              collision
              layout="item"
            />
            <DataRow
              title="Changes in Paid in Capital"
              data={data[ForecastType.CHANGE_IN_PAID_IN_CAPITAL]}
              collision
              layout="item"
            />
            <DataRow
              title="Total Financing Cash Flow"
              data={data[ForecastType.TOTAL_FINANCING_CASH_FLOW]}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export function getCashFlowData(
  dataSource: ForecastResultsResponse,
  period: ForecastPeriod
): ForecastRowData {
  const dataPoints = [
    ForecastType.BEGINNING_CASH,
    ForecastType.CHANGE_IN_ACCOUNT_PAYABLE,
    ForecastType.CHANGE_IN_ACCOUNT_RECEIVABLE,
    ForecastType.CHANGE_IN_CASH,
    ForecastType.CHANGE_IN_FIXED_ASSET,
    ForecastType.CHANGE_IN_PAID_IN_CAPITAL,
    ForecastType.DEPRECIATION,
    ForecastType.ENDING_CASH,
    ForecastType.LONG_TERM_DEBT,
    ForecastType.NET_INCOME,
    ForecastType.REPAYMENT_OF_DEBT,
    ForecastType.TOTAL_FINANCING_CASH_FLOW,
    ForecastType.TOTAL_INVESTING_CASH_FLOW,
    ForecastType.TOTAL_OPERATING_CASH_FLOWS
  ]

  return getDataPointsFactory({
    dataSource,
    dataPoints,
    period,
    sheetName: "cashFlowForecast"
  })
}
