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

interface IncomeStatementTemplateProps {
  title?: string
  data: ForecastRowData
  layout: "default" | "current"
  period: ForecastPeriod
  headerProps: HeaderProps
  isPdf?: boolean
}

export const IncomeStatementTemplate = (
  props: IncomeStatementTemplateProps
) => {
  const {
    title = "Income Statement",
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

            <SectionRow title="Revenue" />
            <DataRow
              title="Recurring Charges"
              data={data[ForecastType.RECURRING_CHARGE]}
              layout="item"
            />
            <DataRow
              title="Contract Revenue"
              data={data[ForecastType.CONTRACT_REVENUE]}
              layout="item"
            />
            <DataRow
              title="Unit Sales"
              data={data[ForecastType.UNIT_SALE]}
              layout="item"
            />
            <DataRow
              title="Billable Hours"
              data={data[ForecastType.BILLABLE_HOUR]}
              layout="item"
            />

            <DataRow
              title="Total Revenue"
              data={data[ForecastType.REVENUE]}
              layout="total"
            />
            {/* This is correct */}
            <DataRow
              title="COGS"
              data={data[ForecastType.DIRECT_COST_REVENUE]}
              layout="total"
            />
            <DataRow
              title="Gross Profit"
              data={data[ForecastType.GROSS_PROFIT]}
              layout="total"
              collision
            />
            <DataRow
              title="Gross Profit Margin"
              data={data[ForecastType.GROSS_PROFIT_MARGIN]?.map(
                (value) => value * 100
              )}
              layout="percentage"
            />

            <SectionRow title="Operating Expenses" />
            <DataRow
              title="Salaries & Benefits"
              data={data[ForecastType.SALARIES_AND_BENEFITS]}
              layout="item"
            />
            <DataRow
              title="Operating Expenses"
              data={data[ForecastType.OPERATING_EXPENSES]}
              layout="item"
            />
            <DataRow
              title="Total Operating Expenses"
              data={data[ForecastType.TOTAL_OPERATING_EXPENSES]}
              layout="total"
            />
            <DataRow
              title="EBITDA"
              data={data[ForecastType.EBITDA]}
              layout="total"
              collision
            />
            <DataRow
              title="Depreciation"
              data={data[ForecastType.DEPRECIATION]}
              layout="item"
            />

            <DataRow
              title="EBIT"
              data={data[ForecastType.EBIT]}
              layout="total"
              collision
            />
            <DataRow
              title="Interest Expense"
              data={data[ForecastType.INTEREST_EXPENSE]}
              layout="item"
            />
            <DataRow
              title="Taxes"
              data={data[ForecastType.TAXES]}
              layout="item"
            />

            <DataRow
              title="Net Income"
              data={data[ForecastType.NET_INCOME]}
              layout="total"
              collision
            />
            <DataRow
              title="Net Profit Margin"
              data={data[ForecastType.NET_PROFIT_MARGIN]?.map(
                (value) => value * 100
              )}
              layout="percentage"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export function getIncomeStatementData(
  dataSource: ForecastResultsResponse,
  period: ForecastPeriod
): ForecastRowData {
  const dataPoints = [
    ForecastType.BILLABLE_HOUR,
    ForecastType.CONTRACT_REVENUE,
    ForecastType.DIRECT_COST_REVENUE,
    ForecastType.EBIT,
    ForecastType.EBITDA,
    ForecastType.GROSS_PROFIT,
    ForecastType.GROSS_PROFIT_MARGIN,
    ForecastType.INTEREST_EXPENSE,
    ForecastType.NET_INCOME,
    ForecastType.NET_PROFIT_MARGIN,
    ForecastType.OPERATING_EXPENSES,
    ForecastType.RECURRING_CHARGE,
    ForecastType.REVENUE,
    ForecastType.DEPRECIATION,
    ForecastType.SALARIES_AND_BENEFITS,
    ForecastType.TAXES,
    ForecastType.TOTAL_OPERATING_EXPENSES,
    ForecastType.UNIT_SALE
  ]

  return getDataPointsFactory({
    dataSource,
    dataPoints,
    period,
    sheetName: "incomeStatementForecast"
  })
}
