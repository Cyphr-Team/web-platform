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
import { TimePeriodsSelection } from "@/modules/loan-application-management/components/molecules/filters/TimePeriodsSelection"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { TIME_PERIODS_LONG } from "@/constants/date.constants"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardActionType } from "../types/stats.types"
import { formatChartMonthly, formatChartWeekly } from "@/utils/date.utils"

// TODO: Integrate API
export const LoanApplicationActivityChart = () => {
  const { loanApplicationActivitiesData, dashboardDispatch, dashboardState } =
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
      type: DashboardActionType.UpdateLoanApplicationActivitiesFrequency,
      payload: timePeriod as GRAPH_FREQUENCY
    })
  }

  const formatDateByTimePeriod =
    dashboardState.loanApplicationActivitiesFrequency === GRAPH_FREQUENCY.WEEKLY
      ? formatChartWeekly
      : formatChartMonthly

  return (
    <div className="w-full h-[500px] bg-white p-4 md:p-6 rounded-xl border">
      <div className="flex flex-wrap justify-between gap-2 items-center mb-8">
        <h2 className="text-xl text-zinc-500">Loan Application Activities</h2>
        <TimePeriodsSelection
          className="h-8"
          onChangeTimePeriod={handleChangeTimePeriod}
          timePeriod={
            dashboardState.loanApplicationActivitiesFrequency ??
            GRAPH_FREQUENCY.MONTHLY
          }
          timePeriods={TIME_PERIODS_LONG}
        />
      </div>

      <ResponsiveContainer width="100%" height="95%" className="-mx-8">
        <ComposedChart
          data={loanApplicationActivitiesData?.loanApplicationActivities.map(
            (v) => ({
              name: v.date,
              draft: v.totalApplicationDraft,
              submitted: v.totalApplicationSubmitted,
              inreview: v.totalApplicationInReview,
              approved: v.totalApplicationApproved,
              denied: v.totalApplicationDenied,
              closed: v.totalApplicationClosed
            })
          )}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20
          }}
        >
          <CartesianGrid {...CARTESIAN_GRID} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            wrapperClassName="text-sm"
            labelFormatter={(value) => formatDateByTimePeriod(value)}
          />

          <XAxis
            dataKey="name"
            fontSize={CHART_DEFAULT.fontSize}
            tickFormatter={(value) => formatDateByTimePeriod(value)}
          />
          <YAxis
            fontSize={CHART_DEFAULT.fontSize}
            tickLine={false}
            axisLine={false}
          />

          <Legend
            iconType="square"
            onClick={(props) => handleLegendClick(props.dataKey as string)}
            wrapperStyle={{ fontSize: "0.875rem", right: -24 }}
            layout="vertical"
            verticalAlign="top"
            align="right"
          />

          <Bar
            hide={activeSeries.includes("draft")}
            unit=" App(s)"
            barSize={18}
            dataKey="draft"
            fill={CHART_DEFAULT.draftColor}
            name="Draft"
          />
          <Bar
            hide={activeSeries.includes("submitted")}
            unit=" App(s)"
            barSize={18}
            dataKey="submitted"
            fill={CHART_DEFAULT.submittedColor}
            name="Submitted"
          />
          <Bar
            hide={activeSeries.includes("inreview")}
            unit=" App(s)"
            barSize={18}
            dataKey="inreview"
            fill={CHART_DEFAULT.inreviewColor}
            name="In-Review"
          />
          <Bar
            hide={activeSeries.includes("approved")}
            unit=" App(s)"
            barSize={18}
            dataKey="approved"
            fill={CHART_DEFAULT.approvedColor}
            name="Approved"
          />
          <Bar
            hide={activeSeries.includes("denied")}
            unit=" App(s)"
            barSize={18}
            dataKey="denied"
            fill={CHART_DEFAULT.deniedColor}
            name="Denied"
          />
          <Bar
            hide={activeSeries.includes("closed")}
            unit=" App(s)"
            barSize={18}
            dataKey="closed"
            fill={CHART_DEFAULT.closedColor}
            name="Closed"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
