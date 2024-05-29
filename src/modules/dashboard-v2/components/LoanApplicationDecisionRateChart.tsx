import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { formatChartMonthly, formatChartWeekly } from "@/utils/date.utils"
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { CARTESIAN_GRID, CHART_DEFAULT } from "../constants/dashboard.constants"
import { useDashboard } from "../providers/dashboard-provider"

export const LoanApplicationDecisionRateChart = () => {
  const { loanApplicationRatesData, dashboardState } = useDashboard()

  const formatDateByTimePeriod =
    dashboardState.loanApplicationRatesFrequency === GRAPH_FREQUENCY.WEEKLY
      ? formatChartWeekly
      : formatChartMonthly

  return (
    <div className="w-full h-[500px] bg-white p-4 md:p-6 rounded-xl border">
      <div className="flex flex-wrap justify-between gap-2 items-center mb-8">
        <h2 className="text-xl text-zinc-500">Incomplete Application Rates</h2>
      </div>

      <ResponsiveContainer width="100%" height="95%" className="-mx-8">
        <ComposedChart
          data={loanApplicationRatesData?.incompleteApplicationRate?.map(
            (v) => ({ date: v.date, incompleteRate: v.rate })
          )}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid {...CARTESIAN_GRID} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            wrapperClassName="text-sm"
            labelFormatter={(value) => formatDateByTimePeriod(value)}
          />

          <XAxis
            dataKey="date"
            fontSize={CHART_DEFAULT.fontSize}
            tickFormatter={(value) => formatDateByTimePeriod(value)}
          />

          <YAxis
            type="number"
            unit="%"
            fontSize={CHART_DEFAULT.fontSize}
            tickLine={false}
            axisLine={false}
          />
          <Line
            strokeWidth={2}
            type="linear"
            unit="%"
            dataKey="incompleteRate"
            name="Incomplete Rate"
            stroke={CHART_DEFAULT.submittedColor}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
