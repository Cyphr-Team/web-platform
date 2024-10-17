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
