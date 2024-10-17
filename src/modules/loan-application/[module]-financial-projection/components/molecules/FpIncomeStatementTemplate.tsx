import { Card } from "@/components/ui/card.tsx"
import { cn } from "@/lib/utils.ts"
import { DataRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DataRow.tsx"
import { SectionRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/SectionRow.tsx"
import {
  HeaderMapper,
  HeaderProps
} from "@/modules/loan-application/[module]-financial-projection/constants"
import { ForecastRowData } from "@/modules/loan-application/[module]-financial-projection/types"
import {
  ForecastPeriod,
  ForecastType
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"

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
    <div className="flex flex-col gap-y-2xl w-full">
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
              data={data[ForecastType.GROSS_PROFIT_MARGIN]}
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
              data={data[ForecastType.NET_PROFIT_MARGIN]}
              layout="percentage"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
