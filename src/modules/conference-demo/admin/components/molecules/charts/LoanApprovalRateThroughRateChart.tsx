import {
  Area,
  AreaChart,
  CartesianGrid,
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
import { MOCK_LOAN_APPROVAL_RATE } from "@/modules/conference-demo/admin/constants/data"
import { Gradients } from "../../styles/GradientBackgroundChart"

const chartConfig = {
  rate: {
    label: "Rate",
    color: "rgba(102, 112, 133, 0.5)"
  }
} satisfies ChartConfig

export function LoanApprovalRateThroughRateChart() {
  return (
    <ChartContainer className="min-h-[200px] size-full" config={chartConfig}>
      <AreaChart accessibilityLayer data={MOCK_LOAN_APPROVAL_RATE}>
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
          dataKey="month"
          tickFormatter={(value: string) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
        />
        <YAxis
          axisLine={false}
          interval={0}
          tickFormatter={(value) => `${value}%`}
          tickLine={false}
          tickMargin={20}
          ticks={[0, 20, 40, 60, 80]}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area dataKey="rate" fill="url(#rate)" stroke="#B3F00D" type="linear">
          <LabelList
            className="font-bold"
            dataKey="rate"
            formatter={(value: number) => `${value}%`}
            position="top"
          />
        </Area>
      </AreaChart>
    </ChartContainer>
  )
}
