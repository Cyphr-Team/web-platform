import { useQueryFinancialProjectionForecast } from "@/modules/loan-application/[module]-financial-projection/hooks/useQueryFinancialProjectionForecast.ts"
import { useMemo } from "react"
import { SectionRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/SectionRow.tsx"
import { DateRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DateRow.tsx"
import { DataRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DataRow.tsx"
import { Card } from "@/components/ui/card.tsx"
import { formatDate } from "@/utils/date.utils.ts"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants.ts"
import { Button } from "@/components/ui/button.tsx"
import { LabeledSwitch } from "@/modules/loan-application/[module]-financial-projection/components/molecules/LabeledSwitch.tsx"
import { useBoolean } from "@/hooks"
import { cn } from "@/lib/utils.ts"

export function Component() {
  const applicationId = useMemo(() => window.location.href.split("#")[1], [])

  const currentDetail = useBoolean(false)
  const monthlyDetail = useBoolean(false)

  useQueryFinancialProjectionForecast({
    applicationId,
    // TODO: fix this
    enabled: false
  })

  return (
    <div className="flex flex-col gap-y-2xl">
      <div className="w-full flex gap-2 justify-end items-center">
        <LabeledSwitch label="Current financial detail" state={currentDetail} />
        <LabeledSwitch label="Monthly forecast detail" state={monthlyDetail} />
        <Button type="button">Download report</Button>
      </div>

      <div className="flex flex-col gap-y-6xl">
        {currentDetail.value ? (
          <Template
            data={Array.from({ length: 1 }, (_, index) => 2024 + index)}
            layout="current"
          />
        ) : null}

        <Template
          data={Array.from({ length: 15 }, (_, index) => 2024 + index)}
          layout="default"
        />
      </div>
    </div>
  )
}

interface TemplateProps {
  layout: "default" | "current"
  // TODO: will remove this to real data
  data: number[]
}

const Template = (props: TemplateProps) => {
  const { layout, data } = props
  const dates = data.map(() =>
    formatDate(new Date(Date.now()).toISOString(), FORMAT_DATE_MM_DD_YYYY)
  )

  const title = layout === "default" ? "Balance Sheet" : "Current Balance Sheet"

  return (
    <div className="flex flex-col gap-y-2xl">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <Card
        className={cn(
          "shadow-primary border-none",
          layout === "current" ? "w-fit" : null
        )}
      >
        <div className="overflow-x-auto overflow-y-visible rounded-xl">
          <div
            className={cn(
              "bg-white",
              layout === "default" ? "min-w-max" : "w-fit"
            )}
          >
            <SectionRow title="Balance Sheet" className="border-t-0" />
            {layout === "default" ? (
              <>
                <DateRow title="Year" data={data} />
                <DateRow
                  title="Month Counter"
                  data={data.map((val) => val + 1 - 2024)}
                />
              </>
            ) : null}
            <DateRow title="Date" data={dates} />

            <SectionRow title="Assets" />
            <DataRow title="Cash" data={data} layout="item" />
            <DataRow
              title="Account Receivables"
              data={data}
              collision
              layout="item"
            />
            <DataRow title="Total Current assets " data={data} layout="total" />
            <DataRow title="Fixed Assets" data={data} collision layout="item" />
            <DataRow
              title="Accumulated Depreciation"
              data={data}
              layout="item"
            />
            <DataRow title="Total Assets" data={data} layout="item" />

            <SectionRow
              title="Liabilities & Owner’s Equity"
              className="border-y"
            />
            <SectionRow
              title="Liabilities"
              className="border-none h-6 italic font-normal"
            />
            <DataRow title="Long Term Debt" data={data} layout="item" />
            <DataRow title="Accounts Payable" data={data} layout="item" />
            <DataRow
              title="Total Liabilities"
              data={data}
              layout="subTotal"
              className="border-none"
            />
            <SectionRow
              title="Equity"
              className="h-6 italic font-normal border-none"
            />
            <DataRow title="Paid in Capital" data={data} layout="item" />
            <DataRow
              title="Accumulated Retained Earnings"
              data={data}
              layout="item"
            />
            <DataRow
              title="Total Equity"
              data={data}
              layout="total"
              collision
            />
            <DataRow
              title="Total Liabilities & Owners Equity"
              data={data}
              layout="total"
              isEnd
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
