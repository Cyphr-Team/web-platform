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
