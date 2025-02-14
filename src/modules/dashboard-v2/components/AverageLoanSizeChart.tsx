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
import { ChartHintToolTip } from "./atoms/ChartHintToolTip"

export function AverageApprovedLoanSizeChart() {
  const { averageApprovedLoanAmountData, dashboardState } = useDashboard()

  const formatDateByTimePeriod =
    dashboardState.frequency === GRAPH_FREQUENCY.WEEKLY
      ? formatChartWeekly
      : formatChartMonthly

  return (
    <div className="flex-1 rounded-xl border bg-white p-4 md:p-6">
      <div className="mb-8 flex items-center gap-2">
        <h2 className="text-xl text-zinc-500">Average Approved Loan Amount</h2>
        <ChartHintToolTip
          formula="Total Loan Volume Approved / Approved Apps"
          formulaExplain={
            <>
              <li>
                <strong>Total Loan Volume Approved:</strong> The total dollar
                amount of all approved loans.
              </li>
              <li>
                <strong>Approved Apps:</strong> The total number of loan
                applications that have been approved.
              </li>
            </>
          }
          head={
            <>
              <strong>Average Approved Loan Amount</strong> represents the
              average amount of loan approved
            </>
          }
        />
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer height="100%" width="100%">
          <ComposedChart
            data={
              averageApprovedLoanAmountData?.averageApprovedLoanAmount ?? []
            }
            margin={{ left: 20, top: 10 }}
          >
            <CartesianGrid {...CARTESIAN_GRID} />
            <Legend
              align="center"
              iconType="square"
              verticalAlign="top"
              wrapperStyle={{ fontSize: "0.875rem", top: -16 }}
            />

            <Tooltip
              cursor={{ fill: "transparent" }}
              formatter={(value) => toCurrency(Number(value), 0)}
              labelFormatter={(value) => formatDateByTimePeriod(value)}
              wrapperClassName="text-sm"
            />

            <XAxis
              dataKey="date"
              fontSize={CHART_DEFAULT.fontSize}
              interval="preserveStartEnd"
              tickFormatter={(value) => formatDateByTimePeriod(value)}
            />
            <YAxis
              axisLine={false}
              fontSize={CHART_DEFAULT.fontSize}
              tickFormatter={(value) => toCurrency(value, 0)}
              tickLine={false}
              yAxisId="left"
            />

            <Bar
              barSize={36}
              dataKey="averageApprovedLoanAmount"
              fill={CHART_DEFAULT.submittedColor}
              name="Loan Amount"
              yAxisId="left"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
