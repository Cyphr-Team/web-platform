"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { MOCK_AVG_TIME_TO_DECISION } from "@/modules/conference-demo/admin/constants/data"
import { Gradients } from "../../styles/GradientBackgroundChart"
import { CHART_COLORS, CHART_DATA_KEY } from "../../../constants/chart-styles"

const chartConfig = {
  timeToReview: {
    label: "Time to review"
  },
  timeToApprove: {
    label: "Time to approve"
  },
  timeToDeny: {
    label: "Time to deny"
  }
} satisfies ChartConfig

export function AverageTimeToDecisionChart() {
  return (
    <ChartContainer className="min-h-[200px] size-full" config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={MOCK_AVG_TIME_TO_DECISION}
        margin={{
          bottom: 20,
          top: 10
        }}
      >
        <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
        <defs>
          <Gradients.yellow id="timeToReview" />
          <Gradients.green id="timeToApprove" />
          <Gradients.red id="timeToDeny" />
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
          allowDataOverflow
          axisLine={false}
          domain={[0, 30]}
          interval={0}
          tickLine={false}
          tickMargin={5}
          ticks={[0, 10, 20, 30]}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey={CHART_DATA_KEY.timeToReview}
          fill="url(#timeToReview)"
          stroke={CHART_COLORS.yellow}
          strokeOpacity={0.8}
          strokeWidth={4}
          type="linear"
        />
        <Area
          dataKey={CHART_DATA_KEY.timeToApprove}
          fill="url(#timeToApprove)"
          stroke={CHART_COLORS.green}
          strokeOpacity={0.8}
          strokeWidth={4}
          type="linear"
        />
        <Area
          dataKey={CHART_DATA_KEY.timeToDeny}
          fill="url(#timeToDeny)"
          stroke={CHART_COLORS.red}
          strokeOpacity={0.8}
          strokeWidth={4}
          type="linear"
        />
      </AreaChart>
    </ChartContainer>
  )
}
