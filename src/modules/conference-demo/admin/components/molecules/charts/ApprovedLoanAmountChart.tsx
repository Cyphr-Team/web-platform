import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis
} from "recharts"

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
import { MOCK_APPROVED_LOAN_AMOUNT } from "@/modules/conference-demo/admin/constants/data"

const chartConfig = {
  usd: {
    label: "USD",
    color: CHART_COLORS["lime-green"]
  }
} satisfies ChartConfig

export function ApprovedLoanAmountChart() {
  return (
    <ChartContainer className="min-h-[400px] size-full" config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={MOCK_APPROVED_LOAN_AMOUNT}
        margin={{
          bottom: 20,
          top: 10
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
          interval={0}
          label={{
            value: CHART_DATA_KEY.usd,
            angle: -90,
            position: "insideLeft"
          }}
          tickFormatter={(value: number) => `$${value.toLocaleString()}`}
          tickLine={false}
          tickMargin={5}
          ticks={[-10000, -5000, 0, 5000, 10000]}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          barSize={48}
          dataKey={CHART_DATA_KEY.usd}
          radius={[1000, 1000, 0, 0]}
        >
          {MOCK_APPROVED_LOAN_AMOUNT.map((item) => (
            <Cell
              key={item.month}
              className={item.usd > 0 ? "rounded-t-full" : "rounded-b-full"}
              fill={item.usd > 0 ? "var(--color-usd)" : "#DFFF86"}
            />
          ))}
          <LabelList
            dataKey={CHART_DATA_KEY.usd}
            fill="#252828"
            formatter={(value: string) => `$${Number(value).toLocaleString()}`}
            position="middle"
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
