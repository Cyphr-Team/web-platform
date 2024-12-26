import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { CHART_DATA_KEY } from "@/modules/conference-demo/admin/constants/chart-styles"
import { MOCK_INCOMPLETE_APPLICATION_RATE } from "@/modules/conference-demo/admin/constants/data"
import { Gradients } from "../../styles/GradientBackgroundChart"

const chartConfig = {
  rate: {
    label: "Rate",
    color: "rgba(102, 112, 133, 0.5)"
  }
} satisfies ChartConfig

export function IncompleteApplicationRateChart() {
  return (
    <div className="min-h-[200px] size-full flex flex-row">
      <span
        className="tracking-wide text-xs text-center text-muted-foreground
      [writing-mode:vertical-lr] whitespace-nowrap -rotate-180 text-nowrap"
      >
        Incomplete Application Rate
      </span>
      <ChartContainer className="min-h-[200px] size-full" config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={MOCK_INCOMPLETE_APPLICATION_RATE}
          margin={{
            bottom: 20,
            top: 10
          }}
        >
          <defs>
            <Gradients.limeGreen id="rate" />
          </defs>
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
            tickFormatter={(value) => `${value}%`}
            tickLine={false}
            tickMargin={5}
            ticks={[0, 10, 20, 30, 40]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            dataKey={CHART_DATA_KEY.rate}
            fill="url(#rate)"
            stroke="#B3F00D"
            type="linear"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
