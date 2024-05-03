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
import { getRandomColor } from "@/modules/loan-application-management/services"
import { capitalizeWords, snakeCaseToText, toCurrency } from "@/utils"
import { useState } from "react"
import { TimePeriodsSelection } from "@/modules/loan-application-management/components/molecules/filters/TimePeriodsSelection"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardActionType } from "../types/stats.types"
import { TIME_PERIODS_LONG } from "@/constants/date.constants"
import { formatChartMonthly, formatChartWeekly } from "@/utils/date.utils"

// TODO: Integrate API
export const AverageLoanSizeOfAllLoanProgram = () => {
  const { dashboardDispatch, dashboardState } = useDashboard()

  const [activeSeries, setActiveSeries] = useState<Array<string>>([])

  const handleLegendClick = (dataKey: string) => {
    if (activeSeries.includes(dataKey)) {
      setActiveSeries(activeSeries.filter((el) => el !== dataKey))
    } else {
      setActiveSeries((prev) => [...prev, dataKey])
    }
  }

  const handleChangeTimePeriod = (timePeriod: string) => {
    dashboardDispatch({
      type: DashboardActionType.UpdateAverageTimeToApprovalMetricsFrequency,
      payload: timePeriod as GRAPH_FREQUENCY
    })
  }

  // Example data, TODO: Replace with API data
  const frameData = [
    {
      date: "2024-04-01",
      demo_loan_program: 200000,
      loan_ready: 250000,
      loan_readiness: 212500
    },
    {
      date: "2024-05-01",
      demo_loan_program: 300000,
      loan_ready: 30000,
      loan_readiness: 325000
    },
    {
      date: "2024-06-01",
      demo_loan_program: 10000,
      loan_ready: 5000,
      loan_readiness: 125000
    }
  ]
  const keys = Object.keys(frameData[0]).filter((v) => v !== "date")

  const formatDateByTimePeriod =
    dashboardState.averageTimeToApprovalMetricsFrequency ===
    GRAPH_FREQUENCY.WEEKLY
      ? formatChartWeekly
      : formatChartMonthly

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl border flex-1">
      <div className="flex flex-wrap justify-between gap-2 items-center mb-8">
        <h2 className="text-xl text-zinc-500">
          Average Loan Size of All Loan Programs
        </h2>
        <TimePeriodsSelection
          className="h-8"
          onChangeTimePeriod={handleChangeTimePeriod}
          timePeriod={
            dashboardState.averageTimeToApprovalMetricsFrequency ??
            GRAPH_FREQUENCY.MONTHLY
          }
          timePeriods={TIME_PERIODS_LONG}
        />
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={frameData} margin={{ left: 20, top: 10 }}>
            <CartesianGrid {...CARTESIAN_GRID} />
            <Tooltip
              cursor={{ fill: "transparent" }}
              wrapperClassName="text-sm"
              formatter={(value) => toCurrency(Number(value), 0)}
              labelFormatter={(value) => formatDateByTimePeriod(value)}
            />

            <XAxis
              dataKey="date"
              fontSize={CHART_DEFAULT.fontSize}
              tickFormatter={(value) => formatDateByTimePeriod(value)}
            />
            <YAxis
              fontSize={CHART_DEFAULT.fontSize}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => toCurrency(value, 0)}
            />

            <Legend
              onClick={(props) => handleLegendClick(props.dataKey as string)}
              iconType="square"
              wrapperStyle={{ fontSize: "0.875rem", top: -16 }}
              verticalAlign="top"
              align="center"
            />

            {keys.map((key, index) => (
              <Bar
                hide={activeSeries.includes(key)}
                key={key}
                barSize={18}
                dataKey={key}
                fill={getRandomColor(index)}
                name={capitalizeWords(snakeCaseToText(key))}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
