import { TIME_PERIODS_LONG } from "@/constants/date.constants"
import { TimePeriodsSelection } from "@/modules/loan-application-management/components/molecules/filters/TimePeriodsSelection"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { formatChartMonthly, formatChartWeekly } from "@/utils/date.utils"
import { useState } from "react"
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { CARTESIAN_GRID, CHART_DEFAULT } from "../constants/dashboard.constants"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardActionType } from "../types/stats.types"

// TODO: Integrate API
export const LoanApplicationDecisionRateChart = () => {
  const { dashboardDispatch, dashboardState } = useDashboard()

  const [activeSeries, setActiveSeries] = useState<Array<string>>([])

  const handleChangeTimePeriod = (timePeriod: string) => {
    dashboardDispatch({
      type: DashboardActionType.UpdateAverageTimeToApprovalMetricsFrequency,
      payload: timePeriod as GRAPH_FREQUENCY
    })
  }

  const handleLegendClick = (dataKey: string) => {
    if (activeSeries.includes(dataKey)) {
      setActiveSeries(activeSeries.filter((el) => el !== dataKey))
    } else {
      setActiveSeries((prev) => [...prev, dataKey])
    }
  }

  // Example data, TODO: Replace with API data
  const frameData = [
    {
      name: "2024-04-01",
      total: 100,
      draft: 45,
      submitted: 23,
      inreview: 12,
      approved: 5,
      denied: 10,
      closed: 2
    },
    {
      name: "2024-05-01",
      total: 200,
      draft: 145,
      submitted: 123,
      inreview: 112,
      approved: 15,
      denied: 110,
      closed: 12
    },
    {
      name: "2024-06-01",
      total: 30,
      draft: 15,
      submitted: 15,
      inreview: 5,
      approved: 4,
      denied: 3,
      closed: 2
    }
  ]

  const formatDateByTimePeriod =
    dashboardState.averageTimeToApprovalMetricsFrequency ===
    GRAPH_FREQUENCY.WEEKLY
      ? formatChartWeekly
      : formatChartMonthly

  return (
    <div className="w-full h-[500px] bg-white p-4 md:p-6 rounded-xl border">
      <div className="flex flex-wrap justify-between gap-2 items-center mb-8">
        <h2 className="text-xl text-zinc-500">Loan Application Rates</h2>
        <TimePeriodsSelection
          className="h-8"
          onChangeTimePeriod={handleChangeTimePeriod}
          timePeriod={
            dashboardState.averageTimeToApprovalMetricsFrequency ??
            GRAPH_FREQUENCY.MONTHLY
          }
          timePeriods={TIME_PERIODS_LONG}
        />
      </div>

      <ResponsiveContainer width="100%" height="95%" className="-mx-8">
        <ComposedChart
          data={frameData.map((v) => ({
            ...v,
            incompleteRate: Math.round((v.draft / v.total) * 100),
            approvalRate: Math.round((v.approved / v.submitted) * 100),
            deniedRate: Math.round((v.denied / v.submitted) * 100)
          }))}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20
          }}
        >
          <CartesianGrid {...CARTESIAN_GRID} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            wrapperClassName="text-sm"
            labelFormatter={(value) => formatDateByTimePeriod(value)}
          />

          <XAxis
            dataKey="name"
            fontSize={CHART_DEFAULT.fontSize}
            tickFormatter={(value) => formatDateByTimePeriod(value)}
          />

          <Legend
            onClick={(props) => handleLegendClick(props.dataKey as string)}
            wrapperStyle={{ fontSize: "0.875rem", right: -24 }}
            layout="vertical"
            verticalAlign="top"
            align="right"
          />

          <YAxis
            type="number"
            unit="%"
            fontSize={CHART_DEFAULT.fontSize}
            tickLine={false}
            axisLine={false}
          />
          <Line
            hide={activeSeries.includes("incompleteRate")}
            strokeWidth={2}
            type="linear"
            unit="%"
            dataKey="incompleteRate"
            name="Incomplete Rate"
            stroke={CHART_DEFAULT.draftLineColor}
          />
          <Line
            hide={activeSeries.includes("approvalRate")}
            strokeWidth={2}
            id="left"
            type="linear"
            unit="%"
            dataKey="approvalRate"
            name="Approval Rate"
            stroke={CHART_DEFAULT.approvalLineColor}
          />
          <Line
            hide={activeSeries.includes("deniedRate")}
            strokeWidth={2}
            id="right"
            type="linear"
            unit="%"
            dataKey="deniedRate"
            name="Denied Rate"
            stroke={CHART_DEFAULT.deniedLineColor}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
