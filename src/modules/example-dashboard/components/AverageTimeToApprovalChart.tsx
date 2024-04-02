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

export function AverageTimeToApprovalChart() {
  const { averageTimeToApprovalMetricsData } = useDashboard()

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-medium mb-2">Average Time To Approval</h1>
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
