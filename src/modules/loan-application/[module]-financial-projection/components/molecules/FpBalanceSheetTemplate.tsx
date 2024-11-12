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

interface BalanceSheetTemplateProps {
  title?: string
  data: ForecastRowData
  layout: "default" | "current"
  period: ForecastPeriod
  headerProps: HeaderProps
  isPdf?: boolean
}

export function BalanceSheetTemplate(props: BalanceSheetTemplateProps) {
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
    <div className="flex w-full flex-col gap-y-3xl">
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
              data={data[ForecastType.CASH]}
              layout="item"
              title="Cash"
            />
            <DataRow
              collision
              data={data[ForecastType.ACCOUNT_RECEIVABLE]}
              layout="item"
              title="Account Receivables"
            />
            <DataRow
              data={data[ForecastType.TOTAL_CURRENT_ASSETS]}
              layout="total"
              title="Total Current Assets"
            />
            <DataRow
              collision
              data={data[ForecastType.FIXED_ASSET]}
              layout="item"
              title="Fixed Assets"
            />
            <DataRow
              data={data[ForecastType.ACCUMULATED_DEPRECIATION]}
              layout="item"
              title="Accumulated Depreciation"
            />
            <DataRow
              data={data[ForecastType.TOTAL_ASSETS]}
              layout="item"
              title="Total Assets"
            />

            <SectionRow
              className="border-y"
              title="Liabilities & Owner’s Equity"
            />
            <SectionRow
              className="h-6 border-y-0 font-normal italic"
              title="Liabilities"
            />
            <DataRow
              data={data[ForecastType.LONG_TERM_DEBT]}
              layout="item"
              title="Long Term Debt"
            />
            <DataRow
              data={data[ForecastType.ACCOUNT_PAYABLE]}
              layout="item"
              title="Accounts Payable"
            />
            <DataRow
              data={data[ForecastType.TOTAL_LIABILITIES]}
              layout="subTotal"
              title="Total Liabilities"
            />
            <SectionRow
              className="h-6 border-b-0 font-normal italic"
              title="Equity"
            />
            <DataRow
              data={data[ForecastType.PAID_IN_CAPITAL]}
              layout="item"
              title="Paid in Capital"
            />
            <DataRow
              data={data[ForecastType.ACCUMULATED_RETAINED_EARNINGS]}
              layout="item"
              title="Accumulated Retained Earnings"
            />
            <DataRow
              collision
              data={data[ForecastType.TOTAL_EQUITY]}
              layout="total"
              title="Total Equity"
            />
            <DataRow
              isEnd
              data={data[ForecastType.TOTAL_LIABILITY_AND_EQUITY]}
              layout="total"
              title="Total Liabilities & Owners Equity"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
