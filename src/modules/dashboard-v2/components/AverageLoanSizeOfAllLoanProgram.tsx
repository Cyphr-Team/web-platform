import { REQUEST_LIMIT_PARAM_FOR_SELECT } from "@/constants"
import { loanProgramsDummyData } from "@/constants/data/dashboard/loanPrograms"
import { TIME_PERIODS_LONG } from "@/constants/date.constants"
import { useQuerySelectLoanProgramList } from "@/hooks/useQuerySelectList/useQuerySelectLoanProgramList"
import { TimePeriodsSelection } from "@/modules/loan-application-management/components/molecules/filters/TimePeriodsSelection"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { getRandomColor } from "@/modules/loan-application-management/services"
import {
  capitalizeWords,
  snakeCaseToText,
  textToCamelCaseFieldPattern,
  toCurrency
} from "@/utils"
import { formatChartMonthly, formatChartWeekly } from "@/utils/date.utils"
import { isEnableLenderDashboardV2DummyData } from "@/utils/feature-flag.utils"
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
import { DashboardActionType } from "../types/stats.types"

// TODO: Integrate API
export const AverageLoanSizeOfAllLoanProgram = () => {
  const { averageApprovedLoanSizeData, dashboardDispatch, dashboardState } =
    useDashboard()

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
      type: DashboardActionType.UpdateAverageLoanSizeFrequency,
      payload: timePeriod as GRAPH_FREQUENCY
    })
  }

  const { data } = useQuerySelectLoanProgramList({
    limit: REQUEST_LIMIT_PARAM_FOR_SELECT,
    offset: 0
  })

  const loanPrograms = isEnableLenderDashboardV2DummyData()
    ? loanProgramsDummyData
    : data?.data

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
    <div className="bg-white p-4 md:p-6 rounded-xl border flex-1">
      <div className="flex flex-wrap justify-between gap-2 items-center mb-8">
        <h2 className="text-xl text-zinc-500">
          Average Loan Size of All Loan Programs
        </h2>
        <TimePeriodsSelection
          className="h-8"
          onChangeTimePeriod={handleChangeTimePeriod}
          timePeriod={
            dashboardState.averageLoanSizeFrequency ?? GRAPH_FREQUENCY.MONTHLY
          }
          timePeriods={TIME_PERIODS_LONG}
        />
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={averageApprovedLoanSizeData?.averageApprovedLoanSize ?? []}
            margin={{ left: 20, top: 10 }}
          >
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
                hide={activeSeries.includes(
                  `value.${textToCamelCaseFieldPattern(key)}`
                )}
                key={key}
                barSize={18}
                dataKey={`value.${textToCamelCaseFieldPattern(key)}`}
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
