import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { formatDateByTimePeriod } from "@/utils/date.utils"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { Gradients } from "@/modules/conference-demo/admin/components/styles/GradientBackgroundChart"
import { CHART_DEFAULT } from "@/modules/dashboard-v2/constants/dashboard.constants"
import { cn } from "@/lib/utils"
import { useId } from "react"

const chartConfig = {
  rate: {
    label: "Rate",
    color: "rgba(102, 112, 133, 0.5)"
  }
} satisfies ChartConfig

interface LoanApplicationDecisionRateChartProps {
  className?: string
  data: {
    date: string
    incompleteRate: number
  }[]
  timePeriod?: GRAPH_FREQUENCY
}

enum DATA_KEYS {
  INCOMPLETE_RATE = "incompleteRate",
  DATE = "date"
}

function LoanApplicationDecisionRateChart({
  className,
  data,
  timePeriod
}: LoanApplicationDecisionRateChartProps) {
  const formatLabelByTimePeriod =
    timePeriod === GRAPH_FREQUENCY.WEEKLY ? "Week" : "Month"

  const id = useId()

  return (
    <div className="min-h-[200px] size-full flex flex-row">
      <span
        className="tracking-wide text-xs text-center text-muted-foreground
      [writing-mode:vertical-lr] whitespace-nowrap -rotate-180 text-nowrap"
      >
        Incomplete Application Rate
      </span>
      <ChartContainer
        className={cn("size-full min-h-[200px]", className)}
        config={chartConfig}
      >
        <AreaChart data={data} margin={{ top: 20, bottom: 20 }}>
          <defs>
            <Gradients.limeGreen id={id} />
          </defs>
          <CartesianGrid
            opacity={1}
            stroke="rgba(204, 204, 204, 1)"
            strokeDasharray="3 3"
            vertical={false}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            labelFormatter={(value: string) =>
              formatDateByTimePeriod(value, timePeriod)
            }
          />

          <XAxis
            axisLine={false}
            dataKey={DATA_KEYS.DATE}
            fontSize={CHART_DEFAULT.fontSize}
            label={{
              value: formatLabelByTimePeriod,
              position: "insideBottom",
              offset: -20
            }}
            tickFormatter={(value: string) =>
              formatDateByTimePeriod(value, timePeriod)
            }
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            domain={[0, 100]}
            fontSize={CHART_DEFAULT.fontSize}
            tickLine={false}
            type="number"
            unit="%"
          />
          <Area
            dataKey={DATA_KEYS.INCOMPLETE_RATE}
            fill={`url(#${id})`}
            name="Incomplete Rate"
            stroke="#B3F00D"
            strokeWidth={2}
            type="linear"
            unit="%"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}

export default LoanApplicationDecisionRateChart
