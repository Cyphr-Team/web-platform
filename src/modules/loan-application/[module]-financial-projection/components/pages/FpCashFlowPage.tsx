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
  /**
   * TODO: dummy date, will remove later
   * */
  const dates = data.map(() =>
    formatDate(new Date(Date.now()).toISOString(), FORMAT_DATE_MM_DD_YYYY)
  )

  const title =
    layout === "default" ? "Cash Flow Statement" : "Current Cash Flow Statement"

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
            <SectionRow title="Cash Flow" className="border-t-0" />
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

            <SectionRow title="Operating Cash Flow" />
            <DataRow title="Net Income" data={data} layout="item" />
            <DataRow title="Depreciation" data={data} collision layout="item" />
            <DataRow
              title="Change in Accounts Receivable"
              data={data}
              collision
              layout="item"
            />
            <DataRow
              title="Change in Accounts Payable"
              data={data}
              collision
              layout="item"
            />
            <DataRow title="Total Operating Cash Flow" data={data} />

            <SectionRow title="Investing Cash Flow" />
            <DataRow
              title="Changes in Fixed Assets"
              data={data}
              collision
              layout="item"
            />
            <DataRow title="Total Investing Cash Flow" data={data} />

            <SectionRow title="Financing Cash Flow" />
            <DataRow
              title="Long Term Debt"
              data={data}
              collision
              layout="item"
            />
            <DataRow
              title="Changes in Paid in Capital"
              data={data}
              collision
              layout="item"
            />
            <DataRow title="Total Financing Cash Flow" data={data} />
          </div>
        </div>
      </Card>
    </div>
  )
}
