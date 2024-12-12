import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import {
  CHART_COLORS,
  CHART_DATA_KEY
} from "@/modules/conference-demo/admin/constants/chart-styles"
import { MOCK_LOAN_DISTRIBUTOR } from "@/modules/conference-demo/admin/constants/data"

const chartConfig = {
  loans: {
    label: "loans",
    color: CHART_COLORS["lime-green"]
  }
} satisfies ChartConfig

export function LoanByIndustrySectorChart() {
  const total = MOCK_LOAN_DISTRIBUTOR.reduce((acc, curr) => acc + curr.loans, 0)

  return (
    <div className="size-full flex flex-col">
      <div>
        <h2 className="font-semibold text-3xl">{total} Total Loans</h2>
        <p className="font-semibold text-sm tracking-wide mt-2">
          Last 3 months
        </p>
      </div>

      <ChartContainer
        className="min-h-[100px] size-full flex-1"
        config={chartConfig}
      >
        <BarChart
          accessibilityLayer
          data={MOCK_LOAN_DISTRIBUTOR}
          layout="vertical"
          margin={{
            left: -20
          }}
        >
          <XAxis hide dataKey={CHART_DATA_KEY.loans} type="number" />
          <YAxis
            axisLine={false}
            dataKey={CHART_DATA_KEY.distributor}
            tickLine={false}
            tickMargin={10}
            type="category"
            width={140}
          />
          <ChartTooltip
            content={<ChartTooltipContent hideLabel />}
            cursor={false}
          />
          <Bar
            barSize={30}
            dataKey={CHART_DATA_KEY.loans}
            fill="var(--color-loans)"
            radius={100}
          >
            <LabelList
              dataKey={CHART_DATA_KEY.loans}
              formatter={(value: number) => `${value} loans`}
              position="right"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
