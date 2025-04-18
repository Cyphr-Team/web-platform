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

interface FpCashFlowTemplateProps {
  title?: string
  data: ForecastRowData
  layout: "default" | "current"
  period: ForecastPeriod
  headerProps: HeaderProps
  isPdf?: boolean
  renderHeaderActions?: () => ReactNode
}

export function FpCashFlowTemplate(props: FpCashFlowTemplateProps) {
  const {
    title = "Cash Flow Statement",
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
        <h1 className="text-2xl font-semibold whitespace-nowrap">{title}</h1>
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
            <SectionRow title="Operating Cash Flow" />
            <DataRow
              data={data[ForecastType.NET_INCOME]}
              layout="item"
              title="Net Income"
            />
            <DataRow
              collision
              data={data[ForecastType.DEPRECIATION]}
              layout="item"
              title="Depreciation"
            />
            <DataRow
              collision
              data={data[ForecastType.CHANGE_IN_ACCOUNT_RECEIVABLE]}
              layout="item"
              title="Change in Accounts Receivable"
            />
            <DataRow
              collision
              data={data[ForecastType.CHANGE_IN_ACCOUNT_PAYABLE]}
              layout="item"
              title="Change in Accounts Payable"
            />
            <DataRow
              data={data[ForecastType.TOTAL_OPERATING_CASH_FLOWS]}
              title="Total Operating Cash Flow"
            />

            <SectionRow title="Investing Cash Flow" />
            <DataRow
              collision
              data={data[ForecastType.CHANGE_IN_FIXED_ASSET]}
              layout="item"
              title="Changes in Fixed Assets"
            />
            <DataRow
              data={data[ForecastType.TOTAL_INVESTING_CASH_FLOW]}
              title="Total Investing Cash Flow"
            />

            <SectionRow title="Financing Cash Flow" />
            <DataRow
              collision
              data={data[ForecastType.LONG_TERM_DEBT]}
              layout="item"
              title="Long Term Debt"
            />
            <DataRow
              data={data[ForecastType.REPAYMENT_OF_DEBT]}
              layout="item"
              title="Repayment Of Debt"
            />
            <DataRow
              collision
              data={data[ForecastType.CHANGE_IN_PAID_IN_CAPITAL]}
              layout="item"
              title="Changes in Paid in Capital"
            />
            <DataRow
              data={data[ForecastType.TOTAL_FINANCING_CASH_FLOW]}
              title="Total Financing Cash Flow"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
