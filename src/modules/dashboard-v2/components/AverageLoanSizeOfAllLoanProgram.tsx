import { REQUEST_LIMIT_PARAM_FOR_SELECT } from "@/constants"
import { useQuerySelectLoanProgramList } from "@/hooks/useQuerySelectList/useQuerySelectLoanProgramList"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { getRandomColor } from "@/modules/loan-application-management/services"
import {
  capitalizeWords,
  snakeCaseToText,
  textToCamelCaseFieldPattern,
  toCurrency
} from "@/utils"
import { formatChartMonthly, formatChartWeekly } from "@/utils/date.utils"
import { useState } from "react"
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

export function AverageLoanSizeOfAllLoanProgram() {
  const { averageApprovedLoanSizeData, dashboardState } = useDashboard()

  const [activeSeries, setActiveSeries] = useState<string[]>([])

  const handleLegendClick = (dataKey: string) => {
    if (activeSeries.includes(dataKey)) {
      setActiveSeries(activeSeries.filter((el) => el !== dataKey))
    } else {
      setActiveSeries((prev) => [...prev, dataKey])
    }
  }

  const { data } = useQuerySelectLoanProgramList({
    limit: REQUEST_LIMIT_PARAM_FOR_SELECT,
    offset: 0
  })

  const loanPrograms = data?.data

  const keys =
    loanPrograms
      ?.filter((program) =>
        dashboardState?.loanProgramIds?.length
          ? dashboardState.loanProgramIds.includes(program.id)
          : true
      )
      .map((program) => program.name) ?? []

  const formatDateByTimePeriod =
    dashboardState.averageLoanSizeFrequency === GRAPH_FREQUENCY.WEEKLY
      ? formatChartWeekly
      : formatChartMonthly

  return (
    <div className="flex-1 rounded-xl border bg-white p-4 md:p-6">
      <div className="mb-8 flex items-center gap-2">
        <h2 className="text-xl text-zinc-500">
          Average Loan Size of All Loan Programs
        </h2>
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
              <strong>Average Loan Size of All Loan Programs</strong> represents
              the average amount of loan approved of each loan programs
            </>
          }
        />
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer height="100%" width="100%">
          <ComposedChart
            data={averageApprovedLoanSizeData?.averageApprovedLoanSize ?? []}
            margin={{ left: 20, top: 10 }}
          >
            <CartesianGrid {...CARTESIAN_GRID} />
            <Tooltip
              cursor={{ fill: "transparent" }}
              formatter={(value) => toCurrency(Number(value), 0)}
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
              tickFormatter={(value) => toCurrency(value, 0)}
              tickLine={false}
            />

            <Legend
              align="center"
              iconType="square"
              verticalAlign="top"
              wrapperStyle={{ fontSize: "0.875rem", top: -16 }}
              onClick={(props) => handleLegendClick(props.dataKey as string)}
            />

            {keys.map((key, index) => (
              <Bar
                key={key}
                barSize={18}
                dataKey={`value.${textToCamelCaseFieldPattern(key)}`}
                fill={getRandomColor(index)}
                hide={activeSeries.includes(
                  `value.${textToCamelCaseFieldPattern(key)}`
                )}
                name={capitalizeWords(snakeCaseToText(key))}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
