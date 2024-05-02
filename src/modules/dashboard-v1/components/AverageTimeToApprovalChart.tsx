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
import { useDashboard } from "../providers/dashboard-provider"
import { TimePeriodsSelection } from "@/modules/loan-application-management/components/molecules/filters/TimePeriodsSelection"
import { DashboardActionType } from "../types/stats.types"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"

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

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-medium mb-2">Average Time To Approval</h1>
        {!!averageTimeToApprovalMetricsData?.averageTimeToApproval.length && (
          <TimePeriodsSelection
            onChangeTimePeriod={handleChangeTimePeriod}
            timePeriod={
              dashboardState.averageTimeToApprovalMetricsFrequency ??
              GRAPH_FREQUENCY.MONTHLY
            }
          />
        )}
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={averageTimeToApprovalMetricsData?.averageTimeToApproval ?? []}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" interval={"preserveStartEnd"} fontSize={12} />
          <YAxis
            fontSize={12}
            dataKey="averageTimeToApproval"
            label={{ value: "Day(s)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip wrapperClassName="text-sm" />
          <Legend wrapperStyle={{ fontSize: "0.875rem" }} />
          <Line
            name="Average Time To Approval"
            type="monotone"
            dataKey="averageTimeToApproval"
            stroke="black"
            unit=" day(s)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
