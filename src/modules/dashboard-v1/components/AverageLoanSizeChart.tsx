import { toCurrency } from "@/utils"
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
import { DashboardActionType } from "../types/stats.types"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { TimePeriodsSelection } from "@/modules/loan-application-management/components/molecules/filters/TimePeriodsSelection"

export function AverageApprovedLoanSizeChart() {
  const { averageApprovedLoanSizeData, dashboardDispatch, dashboardState } =
    useDashboard()

  const handleChangeTimePeriod = (timePeriod: string) => {
    dashboardDispatch({
      type: DashboardActionType.UpdateAverageLoanSizeFrequency,
      payload: timePeriod as GRAPH_FREQUENCY
    })
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">Average Approved Loan Size</h1>
        {!!averageApprovedLoanSizeData?.averageApprovedLoanSize.length && (
          <TimePeriodsSelection
            onChangeTimePeriod={handleChangeTimePeriod}
            timePeriod={
              dashboardState.averageLoanSizeFrequency ?? GRAPH_FREQUENCY.MONTHLY
            }
          />
        )}
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={averageApprovedLoanSizeData?.averageApprovedLoanSize ?? []}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            name="Loan Size"
            type="monotone"
            dataKey="loanSize"
            stroke="#4da50d"
            yAxisId="left"
          />
          <XAxis dataKey="date" interval={"preserveStartEnd"} fontSize={12} />
          <YAxis
            yAxisId="left"
            tickFormatter={(value) => `${toCurrency(value)}`}
            fontSize={12}
          />
          <Tooltip
            formatter={(value) => toCurrency(Number(value))}
            wrapperClassName="text-sm"
            cursor={{ fill: "transparent" }}
          />
          <Legend wrapperStyle={{ fontSize: "0.875rem" }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
