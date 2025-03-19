import { Label, LabelList, Pie, PieChart } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { useMemo } from "react"
import { MOCK_LOAN_DISTRIBUTOR_BY_GENDER } from "@/modules/conference-demo/admin/constants/data"
import { CHART_DATA_KEY } from "../../../constants/chart-styles"

const chartConfig = {
  loans: {
    label: "Loans"
  },
  preferNotToSay: {
    label: "Prefer not to say",
    color: "#EEFFC0"
  },
  males: {
    label: "Males",
    color: "#DFFF86"
  },
  females: {
    label: "Females",
    color: "#B3F00D"
  },
  nonBinary: {
    label: "Non-binary",
    color: "#A4DE04"
  }
} satisfies ChartConfig

export function LoanDistributorChart() {
  const totalLoans = useMemo(
    () =>
      MOCK_LOAN_DISTRIBUTOR_BY_GENDER.reduce(
        (acc, curr) => acc + curr.loans,
        0
      ),
    [MOCK_LOAN_DISTRIBUTOR_BY_GENDER]
  )

  return (
    <ChartContainer
      className="mx-auto size-full min-h-[200px]"
      config={chartConfig}
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent hideLabel />}
          cursor={false}
        />
        <Pie
          data={MOCK_LOAN_DISTRIBUTOR_BY_GENDER}
          dataKey={CHART_DATA_KEY.loans}
          endAngle={-270}
          innerRadius={60}
          nameKey={CHART_DATA_KEY.gender}
          startAngle={90}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    dominantBaseline="middle"
                    textAnchor="middle"
                    x={viewBox.cx}
                    y={viewBox.cy}
                  >
                    <tspan
                      className="fill-foreground text-3xl font-bold"
                      x={viewBox.cx}
                      y={viewBox.cy}
                    >
                      {totalLoans.toLocaleString()}
                    </tspan>
                    <tspan
                      className="fill-muted-foreground"
                      x={viewBox.cx}
                      y={(viewBox.cy ?? 0) + 24}
                    >
                      loans
                    </tspan>
                  </text>
                )
              }
            }}
          />
          <LabelList
            className="fill-black text-xs w-3 text-wrap"
            dataKey={CHART_DATA_KEY.gender}
            fontSize={10}
            formatter={(value: keyof typeof chartConfig) =>
              chartConfig[value]?.label
            }
            stroke="none"
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
