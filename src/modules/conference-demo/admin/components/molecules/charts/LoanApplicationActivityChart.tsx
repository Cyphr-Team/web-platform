import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { MOCK_LOAN_APPLICATION_ACTIVITY } from "@/modules/conference-demo/admin/constants/data"
import { CHART_DATA_KEY } from "../../../constants/chart-styles"

const chartConfig = {
  draft: {
    label: "Draft",
    color: "rgba(102, 112, 133, 0.5)"
  },
  submitted: {
    label: "Submitted",
    color: "rgba(44, 138, 240, 0.5)"
  },
  inreview: {
    label: "In-Review",
    color: "rgba(237, 138, 9, 0.5)"
  },
  approved: {
    label: "Approved",
    color: "rgba(231, 65, 54, 0.5)"
  },
  denied: {
    label: "Denied",
    color: "rgba(17, 176, 102, 0.5)"
  }
} satisfies ChartConfig

export function LoanApplicationActivityChart() {
  return (
    <ChartContainer className="size-full" config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={MOCK_LOAN_APPLICATION_ACTIVITY}
        margin={{
          bottom: 20
        }}
      >
        <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
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
          label={{ value: "Applications", angle: -90, position: "insideLeft" }}
          tickLine={false}
          tickMargin={5}
          ticks={[0, 50, 100, 150, 200]}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          barSize={6}
          dataKey="draft"
          fill="var(--color-draft)"
          radius={100}
        />
        <Bar
          barSize={6}
          dataKey="submitted"
          fill="var(--color-submitted)"
          radius={100}
        />
        <Bar
          barSize={6}
          dataKey="inreview"
          fill="var(--color-inreview)"
          radius={100}
        />
        <Bar
          barSize={6}
          dataKey="approved"
          fill="var(--color-approved)"
          radius={100}
        />
        <Bar
          barSize={6}
          dataKey="denied"
          fill="var(--color-denied)"
          radius={100}
        />
      </BarChart>
    </ChartContainer>
  )
}
