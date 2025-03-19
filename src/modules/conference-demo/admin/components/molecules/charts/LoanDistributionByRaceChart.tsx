import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { MOCK_LOANS_DISTRIBUTOR_BY_RACE } from "@/modules/conference-demo/admin/constants/data"
import {
  CHART_COLORS,
  CHART_DATA_KEY
} from "@/modules/conference-demo/admin/constants/chart-styles"

const chartConfig = {
  race: {
    label: "Race",
    color: CHART_COLORS["lime-green"]
  }
} satisfies ChartConfig

export function LoanDistributionByRaceChart() {
  const total = MOCK_LOANS_DISTRIBUTOR_BY_RACE.reduce(
    (acc, curr) => acc + curr.loans,
    0
  )

  return (
    <div className="size-full flex flex-col">
      <div>
        <h2 className="font-semibold text-3xl">{total} Total Loans</h2>
        <p className="font-semibold text-sm tracking-wide mt-2">
          Last 3 months
        </p>
      </div>

      <ChartContainer
        className="min-h-[500px] size-full flex-1"
        config={chartConfig}
      >
        <BarChart
          accessibilityLayer
          data={MOCK_LOANS_DISTRIBUTOR_BY_RACE}
          layout="vertical"
        >
          <XAxis hide dataKey="loans" type="number" />
          <YAxis
            axisLine={false}
            dataKey={CHART_DATA_KEY.race}
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
            fill={CHART_COLORS["lime-green"]}
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
