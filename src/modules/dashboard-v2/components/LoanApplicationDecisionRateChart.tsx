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
import { ChartHintToolTip } from "./atoms/ChartHintToolTip"

export function LoanApplicationDecisionRateChart() {
  const { loanApplicationRatesData, dashboardState } = useDashboard()

  const formatDateByTimePeriod =
    dashboardState.loanApplicationRatesFrequency === GRAPH_FREQUENCY.WEEKLY
      ? formatChartWeekly
      : formatChartMonthly

  return (
    <div className="w-full h-[500px] bg-white p-4 md:p-6 rounded-xl border">
      <div className="flex gap-2 items-center mb-8">
        <h2 className="text-xl text-zinc-500">Incomplete Application Rates</h2>
        <ChartHintToolTip
          formula="(Draft Apps / Total Apps) * 100"
          formulaExplain={
            <>
              <li>
                <strong>Draft Apps:</strong> Applications that have been started
                but not submitted.
              </li>
              <li>
                <strong>Total Apps:</strong> The total number of applications,
                including both completed and draft applications.
              </li>
            </>
          }
          head={
            <>
              <strong>Incomplete Application Rates</strong> represent the
              proportion of applications that were started but not completed
            </>
          }
        />
      </div>

      <ResponsiveContainer className="-mx-8" height="95%" width="100%">
        <ComposedChart
          data={loanApplicationRatesData?.incompleteApplicationRate?.map(
            (v) => ({ date: v.date, incompleteRate: v.rate * 100 })
          )}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid {...CARTESIAN_GRID} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            labelFormatter={(value) => formatDateByTimePeriod(value)}
            wrapperClassName="text-sm"
          />

          <XAxis
            dataKey="date"
            fontSize={CHART_DEFAULT.fontSize}
            tickFormatter={(value) => formatDateByTimePeriod(value)}
          />

          <YAxis
            axisLine={false}
            fontSize={CHART_DEFAULT.fontSize}
            tickLine={false}
            type="number"
            unit="%"
          />
          <Line
            dataKey="incompleteRate"
            name="Incomplete Rate"
            stroke={CHART_DEFAULT.submittedColor}
            strokeWidth={2}
            type="linear"
            unit="%"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
