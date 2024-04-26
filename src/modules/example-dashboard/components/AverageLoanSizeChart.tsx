import { TimePeriodsSelection } from "@/modules/loan-application-management/components/molecules/filters/TimePeriodsSelection"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { toCurrency } from "@/utils"
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  ResponsiveContainer,
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
    <div className="mt-8 bg-white p-4 md:p-6 rounded-xl border">
      <div className="flex justify-between">
        <h2 className="mb-4 text-xl text-zinc-500">
          Average Approved Loan Amount (USD)
        </h2>
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
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid {...CARTESIAN_GRID} />
          <Bar
            barSize={36}
            name="Loan Size"
            dataKey="loanSize"
            fill={CHART_DEFAULT.submittedColor}
            yAxisId="left"
          >
            <LabelList
              {...LABEL_CONFIG}
              dataKey="loanSize"
              formatter={(value: string) =>
                value ? toCurrency(Number(value)) : ""
              }
            />
          </Bar>
          <XAxis
            dataKey="date"
            interval={"preserveStartEnd"}
            fontSize={CHART_DEFAULT.fontSize}
          />
          <YAxis
            yAxisId="left"
            tickFormatter={(value) => `${toCurrency(value, 0)}`}
            fontSize={CHART_DEFAULT.fontSize}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
