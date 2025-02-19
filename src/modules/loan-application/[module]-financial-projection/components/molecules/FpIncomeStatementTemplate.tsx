import { Card } from "@/components/ui/card.tsx"
import { cn } from "@/lib/utils.ts"
import { DataRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DataRow.tsx"
import { SectionRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/SectionRow.tsx"
import {
  HeaderMapper,
  type HeaderProps
} from "@/modules/loan-application/[module]-financial-projection/constants"
import { type ForecastRowData } from "@/modules/loan-application/[module]-financial-projection/types"
import {
  type ForecastPeriod,
  ForecastType
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { type ReactNode } from "react"

interface IncomeStatementTemplateProps {
  title?: string
  data: ForecastRowData
  layout: "default" | "current"
  period: ForecastPeriod
  headerProps: HeaderProps
  isPdf?: boolean
  renderHeaderActions?: () => ReactNode
}

export function IncomeStatementTemplate(props: IncomeStatementTemplateProps) {
  const {
    title = "Income Statement",
    layout,
    period,
    headerProps,
    data,
    isPdf = false,
    renderHeaderActions
  } = props

  const HeaderComponent = HeaderMapper[period]

  return (
    <div className="flex w-full flex-col gap-y-2xl">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-3xl font-semibold whitespace-nowrap">{title}</h1>
        {renderHeaderActions ? renderHeaderActions() : null}
      </div>
      <Card
        className={cn(
          isPdf ? null : "shadow-primary",
          "flex flex-col rounded-xl",
          layout === "current" ? "w-fit" : null
        )}
      >
        <div className="rounded-xl overflow-x-auto overflow-y-visible">
          <div
            className={cn(
              "bg-white",
              layout === "default" ? "min-w-max" : "w-fit"
            )}
          >
            <HeaderComponent {...headerProps} />

            <SectionRow title="Revenue" />
            <DataRow
              data={data[ForecastType.RECURRING_CHARGE]}
              layout="item"
              title="Recurring Charges"
            />
            <DataRow
              data={data[ForecastType.CONTRACT_REVENUE]}
              layout="item"
              title="Contract Revenue"
            />
            <DataRow
              data={data[ForecastType.UNIT_SALE]}
              layout="item"
              title="Unit Sales"
            />
            <DataRow
              data={data[ForecastType.BILLABLE_HOUR]}
              layout="item"
              title="Billable Hours"
            />

            <DataRow
              data={data[ForecastType.REVENUE]}
              layout="total"
              title="Total Revenue"
            />
            {/* This is correct */}
            <DataRow
              data={data[ForecastType.DIRECT_COST_REVENUE]}
              layout="total"
              title="COGS"
            />
            <DataRow
              collision
              data={data[ForecastType.GROSS_PROFIT]}
              layout="total"
              title="Gross Profit"
            />
            <DataRow
              data={data[ForecastType.GROSS_PROFIT_MARGIN]}
              layout="percentage"
              title="Gross Profit Margin"
            />

            <SectionRow title="Operating Expenses" />
            <DataRow
              data={data[ForecastType.SALARIES_AND_BENEFITS]}
              layout="item"
              title="Salaries & Benefits"
            />
            <DataRow
              data={data[ForecastType.OPERATING_EXPENSES]}
              layout="item"
              title="Operating Expenses"
            />
            <DataRow
              data={data[ForecastType.TOTAL_OPERATING_EXPENSES]}
              layout="total"
              title="Total Operating Expenses"
            />
            <DataRow
              collision
              data={data[ForecastType.EBITDA]}
              layout="total"
              title="EBITDA"
            />
            <DataRow
              data={data[ForecastType.DEPRECIATION]}
              layout="item"
              title="Depreciation"
            />

            <DataRow
              collision
              data={data[ForecastType.EBIT]}
              layout="total"
              title="EBIT"
            />
            <DataRow
              data={data[ForecastType.INTEREST_EXPENSE]}
              layout="item"
              title="Interest Expense"
            />
            <DataRow
              data={data[ForecastType.TAXES]}
              layout="item"
              title="Taxes"
            />

            <DataRow
              collision
              data={data[ForecastType.NET_INCOME]}
              layout="total"
              title="Net Income"
            />
            <DataRow
              data={data[ForecastType.NET_PROFIT_MARGIN]}
              layout="percentage"
              title="Net Profit Margin"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
