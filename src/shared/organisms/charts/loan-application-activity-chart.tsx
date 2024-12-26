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

interface LoanApplicationActivityChartProps {
  data: {
    name: string
    draft: number
    submitted: number
    inreview: number
    denied: number
    approved: number
  }[]
  timePeriod?: GRAPH_FREQUENCY
  className?: string
}

enum DATA_KEYS {
  NAME = "name",
  DRAFT = "draft",
  SUBMITTED = "submitted",
  INREVIEW = "inreview",
  APPROVED = "approved",
  DENIED = "denied"
}

const chartConfig = {
  [DATA_KEYS.DRAFT]: {
    label: "Draft",
    color: "rgba(102, 112, 133, 0.5)"
  },
  [DATA_KEYS.SUBMITTED]: {
    label: "Submitted",
    color: "rgba(44, 138, 240, 0.5)"
  },
  [DATA_KEYS.INREVIEW]: {
    label: "In-Review",
    color: "rgba(237, 138, 9, 0.5)"
  },
  [DATA_KEYS.DENIED]: {
    label: "Denied",
    color: "rgba(231, 65, 54, 0.5)"
  },
  [DATA_KEYS.APPROVED]: {
    label: "Approved",
    color: "rgba(17, 176, 102, 0.5)"
  }
} satisfies ChartConfig

// TODO: reuse in finovate demo
export default function LoanApplicationActivityChart({
  data,
  className,
  timePeriod = GRAPH_FREQUENCY.MONTHLY
}: LoanApplicationActivityChartProps) {
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
          dataKey={DATA_KEYS.NAME}
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
          domain={[0, "dataMax"]}
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

        <Bar
          barSize={6}
          dataKey={DATA_KEYS.DRAFT}
          fill={`var(--color-${DATA_KEYS.DRAFT})`}
          hide={activeSeries.includes(DATA_KEYS.DRAFT)}
          name="Draft"
          radius={100}
          unit="App(s)"
        />
        <Bar
          barSize={6}
          dataKey={DATA_KEYS.SUBMITTED}
          fill={`var(--color-${DATA_KEYS.SUBMITTED})`}
          hide={activeSeries.includes(DATA_KEYS.SUBMITTED)}
          name="Submitted"
          radius={100}
          unit="App(s)"
        />
        <Bar
          barSize={6}
          dataKey={DATA_KEYS.INREVIEW}
          fill={`var(--color-${DATA_KEYS.INREVIEW})`}
          hide={activeSeries.includes(DATA_KEYS.INREVIEW)}
          name="In-Review"
          radius={100}
          unit="App(s)"
        />
        <Bar
          barSize={6}
          dataKey={DATA_KEYS.DENIED}
          fill={`var(--color-${DATA_KEYS.DENIED})`}
          hide={activeSeries.includes(DATA_KEYS.DENIED)}
          name="Denied"
          radius={100}
          unit="App(s)"
        />
        <Bar
          barSize={6}
          dataKey={DATA_KEYS.APPROVED}
          fill={`var(--color-${DATA_KEYS.APPROVED})`}
          hide={activeSeries.includes(DATA_KEYS.APPROVED)}
          name="Approved"
          radius={100}
          unit="App(s)"
        />
      </BarChart>
    </ChartContainer>
  )
}
