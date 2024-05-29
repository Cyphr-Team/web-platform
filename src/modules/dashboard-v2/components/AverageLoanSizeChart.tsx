import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { toCurrency } from "@/utils"
import { formatChartMonthly, formatChartWeekly } from "@/utils/date.utils"
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { CARTESIAN_GRID, CHART_DEFAULT } from "../constants/dashboard.constants"
import { useDashboard } from "../providers/dashboard-provider"

// TODO: Integrate API
export function AverageApprovedLoanSizeChart() {
  const { averageApprovedLoanAmountData, dashboardState } = useDashboard()

  const formatDateByTimePeriod =
    dashboardState.averageApprovedLoanAmountFrequency === GRAPH_FREQUENCY.WEEKLY
      ? formatChartWeekly
      : formatChartMonthly

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl border flex-1">
      <div className="flex justify-between gap-2 items-center mb-8">
        <h2 className="text-xl text-zinc-500">Average Approved Loan Amount</h2>
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={
              averageApprovedLoanAmountData?.averageApprovedLoanAmount ?? []
            }
            margin={{ left: 20, top: 10 }}
          >
            <CartesianGrid {...CARTESIAN_GRID} />
            <Legend
              iconType="square"
              wrapperStyle={{ fontSize: "0.875rem", top: -16 }}
              verticalAlign="top"
              align="center"
            />

            <Tooltip
              cursor={{ fill: "transparent" }}
              wrapperClassName="text-sm"
              formatter={(value) => toCurrency(Number(value), 0)}
              labelFormatter={(value) => formatDateByTimePeriod(value)}
            />

            <XAxis
              dataKey="date"
              tickFormatter={(value) => formatDateByTimePeriod(value)}
              interval={"preserveStartEnd"}
              fontSize={CHART_DEFAULT.fontSize}
            />
            <YAxis
              yAxisId="left"
              tickFormatter={(value) => `${toCurrency(value, 0)}`}
              fontSize={CHART_DEFAULT.fontSize}
              tickLine={false}
              axisLine={false}
            />

            <Bar
              barSize={36}
              name="Loan Amount"
              dataKey="averageApprovedLoanAmount"
              fill={CHART_DEFAULT.submittedColor}
              yAxisId="left"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
