import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { formatDateByTimePeriod } from "@/utils/date.utils"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

interface LoanApplicationActivityChartProps<T> {
  data: (T & {
    time: string
  })[]
  timePeriod?: GRAPH_FREQUENCY
  className?: string
  chartConfig: ChartConfig
}

enum DATA_KEYS {
  TIME = "time"
}

function LoanApplicationActivityChart<T>(
  props: LoanApplicationActivityChartProps<T>
) {
  const {
    data,
    className,
    timePeriod = GRAPH_FREQUENCY.MONTHLY,
    chartConfig
  } = props
  const [activeSeries, setActiveSeries] = useState<string[]>([])

  const handleLegendClick = (dataKey: string) => {
    setActiveSeries((prev) =>
      prev.includes(dataKey)
        ? prev.filter((el) => el !== dataKey)
        : [...prev, dataKey]
    )
  }

  const formatLabelByTimePeriod =
    timePeriod === GRAPH_FREQUENCY.WEEKLY ? "Week" : "Month"

  return (
    <ChartContainer
      className={cn("min-h-[200px] w-full", className)}
      config={chartConfig}
    >
      <BarChart
        data={data}
        margin={{
          bottom: 20
        }}
      >
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
          dataKey={DATA_KEYS.TIME}
          label={{
            value: formatLabelByTimePeriod,
            position: "insideBottom",
            offset: -20
          }}
          tickFormatter={(value: string) =>
            formatDateByTimePeriod(value, timePeriod)
          }
          tickLine={false}
          tickMargin={10}
        />
        <YAxis
          allowDecimals={false}
          axisLine={false}
          domain={[0, (dataMax: number) => dataMax + 50]}
          label={{
            value: "Applications",
            angle: -90,
            position: "insideLeft"
          }}
          tickLine={false}
          tickMargin={5}
        />

        <ChartLegend
          content={<ChartLegendContent />}
          verticalAlign="top"
          onClick={(props) => handleLegendClick(props.dataKey as string)}
        />
        {Object.keys(chartConfig).map((key) => (
          <Bar
            key={key}
            barSize={6}
            dataKey={key}
            fill={chartConfig[key].color}
            hide={activeSeries.includes(key)}
            name={chartConfig[key].label?.toString()}
            radius={100}
            unit="App(s)"
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}

export default LoanApplicationActivityChart
