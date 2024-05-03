import { TIME_PERIODS_LONG } from "@/constants/date.constants"
import { TimePeriodsSelection } from "@/modules/loan-application-management/components/molecules/filters/TimePeriodsSelection"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
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
import { formatChartMonthly, formatChartWeekly } from "@/utils/date.utils"

// TODO: Integrate API
export function AverageTimeToApprovalChart() {
  const {
    averageTimeToApprovalMetricsData,
    dashboardDispatch,
    dashboardState
  } = useDashboard()

  const handleChangeTimePeriod = (timePeriod: string) => {
    dashboardDispatch({
      type: DashboardActionType.UpdateAverageTimeToApprovalMetricsFrequency,
      payload: timePeriod as GRAPH_FREQUENCY
    })
  }

  const formatDateByTimePeriod =
    dashboardState.averageTimeToApprovalMetricsFrequency ===
    GRAPH_FREQUENCY.WEEKLY
      ? formatChartWeekly
      : formatChartMonthly

  return (
    <div className="mt-8 bg-white p-4 md:p-6 rounded-xl border">
      <div className="flex justify-between gap-2 items-center mb-8">
        <h2 className="text-xl text-zinc-500">Average Time To Decision</h2>
        {!!averageTimeToApprovalMetricsData?.averageTimeToApproval.length && (
          <TimePeriodsSelection
            className="h-8"
            onChangeTimePeriod={handleChangeTimePeriod}
            timePeriod={
              dashboardState.averageTimeToApprovalMetricsFrequency ??
              GRAPH_FREQUENCY.MONTHLY
            }
            timePeriods={TIME_PERIODS_LONG}
          />
        )}
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={
            averageTimeToApprovalMetricsData?.averageTimeToApproval.map(
              (v) => ({
                ...v,
                averageTimeToDenied: Math.round(v.averageTimeToApproval + 1.8),
                averageTimeToDecision: Math.round(v.averageTimeToApproval + 1.2)
              })
            ) ?? []
          }
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid {...CARTESIAN_GRID} />
          <XAxis
            dataKey="date"
            interval={"preserveStartEnd"}
            fontSize={CHART_DEFAULT.fontSize}
            padding={{ left: 30, right: 30 }}
            tickFormatter={(value) => formatDateByTimePeriod(value)}
          />
          <YAxis
            fontSize={CHART_DEFAULT.fontSize}
            label={{ value: "Day(s)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            wrapperClassName="text-sm"
            labelFormatter={(value) => formatDateByTimePeriod(value)}
          />

          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: "0.875rem", top: -8 }}
            verticalAlign="top"
            align="center"
          />

          <Line
            name="Time To Decision"
            dataKey="averageTimeToDecision"
            stroke={CHART_DEFAULT.submittedColor}
            unit=" day(s)"
          />

          <Line
            name="Time To Approval"
            dataKey="averageTimeToApproval"
            stroke={CHART_DEFAULT.approvedColor}
            unit=" day(s)"
          />

          <Line
            name="Time to Denial"
            dataKey="averageTimeToDenied"
            stroke={CHART_DEFAULT.deniedColor}
            unit=" day(s)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
