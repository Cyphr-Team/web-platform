import { TimePeriodsSelection } from "@/modules/loan-application-management/components/molecules/filters/TimePeriodsSelection"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import {
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import {
  CARTESIAN_GRID,
  CHART_DEFAULT,
  LABEL_CONFIG
} from "../constants/dashboard.constants"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardActionType } from "../types/stats.types"

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
    <div className="mt-8 bg-white p-4 md:p-6 rounded-xl border">
      <div className="flex justify-between">
        <h2 className="mb-4 text-xl text-zinc-500">Average Time To Decision</h2>
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
          data={
            averageTimeToApprovalMetricsData?.averageTimeToApproval.map(
              (v) => ({
                ...v,
                averageTimeToDenied: v.averageTimeToApproval + 0.8,
                averageTimeToDecision: v.averageTimeToApproval + 1.2
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
          />
          <YAxis
            fontSize={CHART_DEFAULT.fontSize}
            label={{ value: "Day(s)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip wrapperClassName="text-sm" />

          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: "0.875rem", top: -4 }}
            verticalAlign="top"
            align="center"
          />

          <Line
            name="Time To Decision"
            dataKey="averageTimeToDecision"
            stroke={CHART_DEFAULT.submittedColor}
            unit=" day(s)"
          >
            <LabelList
              {...LABEL_CONFIG}
              dataKey="averageTimeToDecision"
              fill={CHART_DEFAULT.submittedColor}
            />
          </Line>

          <Line
            name="Time To Approval"
            dataKey="averageTimeToApproval"
            stroke={CHART_DEFAULT.approvedColor}
            unit=" day(s)"
          >
            <LabelList
              {...LABEL_CONFIG}
              dataKey="averageTimeToApproval"
              fill={CHART_DEFAULT.approvedColor}
            />
          </Line>

          <Line
            name="Time To Denied"
            dataKey="averageTimeToDenied"
            stroke={CHART_DEFAULT.deniedColor}
            unit=" day(s)"
          >
            <LabelList
              {...LABEL_CONFIG}
              dataKey="averageTimeToDenied"
              fill={CHART_DEFAULT.deniedColor}
            />
          </Line>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
