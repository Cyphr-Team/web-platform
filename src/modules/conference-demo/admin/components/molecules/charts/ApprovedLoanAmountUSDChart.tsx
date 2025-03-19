import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { MOCK_APPROVED_LOAN_AMOUNT_USD } from "@/modules/conference-demo/admin/constants/data"
import {
  CHART_COLORS,
  CHART_DATA_KEY
} from "@/modules/conference-demo/admin/constants/chart-styles"

const chartConfig = {
  usd: {
    label: "USD",
    color: CHART_COLORS["lime-green"]
  }
} satisfies ChartConfig

export function ApprovedLoanAmountUSDChart() {
  return (
    <ChartContainer className="min-h-[200px] size-full" config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={MOCK_APPROVED_LOAN_AMOUNT_USD}
        margin={{
          bottom: 20,
          top: 10,
          left: 20
        }}
      >
        <CartesianGrid
          opacity={1}
          stroke="rgba(204, 204, 204, 1)"
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          axisLine={false}
          dataKey={CHART_DATA_KEY.month}
          label={{ value: "Month", position: "insideBottom", offset: -20 }}
          tickFormatter={(value: string) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
        />
        <YAxis
          axisLine={false}
          label={{
            value: "USD",
            angle: -90,
            position: "insideLeft",
            offset: -15
          }}
          tickCount={6}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          tickLine={false}
          tickMargin={5}
          ticks={[0, 10000, 20000, 30000, 40000, 50000]}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          barSize={30}
          dataKey={CHART_DATA_KEY.usd}
          fill="var(--color-usd)"
          radius={[100, 100, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  )
}
