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
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { useDashboard } from "../providers/dashboard-provider"
import { formatChartMonthly, formatChartWeekly } from "@/utils/date.utils"
import { ChartHintToolTip } from "./atoms/ChartHintToolTip"
import { isSbb } from "@/utils/domain.utils"

export function LoanApplicationActivityChart() {
  const { loanApplicationActivitiesData, dashboardState } = useDashboard()

  const [activeSeries, setActiveSeries] = useState<string[]>([])

  const handleLegendClick = (dataKey: string) => {
    if (activeSeries.includes(dataKey)) {
      setActiveSeries(activeSeries.filter((el) => el !== dataKey))
    } else {
      setActiveSeries((prev) => [...prev, dataKey])
    }
  }

  const formatDateByTimePeriod =
    dashboardState.loanApplicationActivitiesFrequency === GRAPH_FREQUENCY.WEEKLY
      ? formatChartWeekly
      : formatChartMonthly

  return (
    <div className="w-full h-[500px] bg-white p-4 md:p-6 rounded-xl border">
      <div className="flex gap-2 items-center mb-8">
        <h2 className="text-xl text-zinc-500">
          {isSbb() ? "Application Activities" : "Loan Application Activities"}
        </h2>
        <ChartHintToolTip
          formula={null}
          formulaExplain={
            <>
              <li>
                <strong>Draft:</strong> # of Applications which were started but
                haven't been submitted.
              </li>
              <li>
                <strong>Submitted:</strong> # of Applications which completed
                all steps and have been submitted by Applicant.
              </li>
              <li>
                <strong>In-Review:</strong> # of Submitted Apps ready for review
                + have been viewed at least once by the Lender.
              </li>
              <li>
                <strong>Approved:</strong> # of Applications which were
                approved.
              </li>
              <li>
                <strong>Denied:</strong> # of Applications which were denied.
              </li>
              <li>
                <strong>Closed:</strong> # of Applications which were closed
                (enriched w/ by whom and for what reason).
              </li>
            </>
          }
          head={
            <>
              <strong>
                {isSbb()
                  ? "Application Activities"
                  : "Loan Application Activities"}
              </strong>{" "}
              represent the number of loan applications at each stage of the
              application process.
            </>
          }
        />
      </div>

      <ResponsiveContainer className="-mx-8" height="95%" width="100%">
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
            labelFormatter={(value) => formatDateByTimePeriod(value)}
            wrapperClassName="text-sm"
          />

          <XAxis
            dataKey="name"
            fontSize={CHART_DEFAULT.fontSize}
            tickFormatter={(value) => formatDateByTimePeriod(value)}
          />
          <YAxis
            axisLine={false}
            fontSize={CHART_DEFAULT.fontSize}
            tickLine={false}
          />

          <Legend
            align="right"
            iconType="square"
            layout="vertical"
            verticalAlign="top"
            wrapperStyle={{ fontSize: "0.875rem", right: -24 }}
            onClick={(props) => handleLegendClick(props.dataKey as string)}
          />

          <Bar
            barSize={18}
            dataKey="draft"
            fill={CHART_DEFAULT.draftColor}
            hide={activeSeries.includes("draft")}
            name="Draft"
            unit=" App(s)"
          />
          <Bar
            barSize={18}
            dataKey="submitted"
            fill={CHART_DEFAULT.submittedColor}
            hide={activeSeries.includes("submitted")}
            name="Submitted"
            unit=" App(s)"
          />
          <Bar
            barSize={18}
            dataKey="inreview"
            fill={CHART_DEFAULT.inreviewColor}
            hide={activeSeries.includes("inreview")}
            name="In-Review"
            unit=" App(s)"
          />
          <Bar
            barSize={18}
            dataKey="approved"
            fill={CHART_DEFAULT.approvedColor}
            hide={activeSeries.includes("approved")}
            name="Approved"
            unit=" App(s)"
          />
          <Bar
            barSize={18}
            dataKey="denied"
            fill={CHART_DEFAULT.deniedColor}
            hide={activeSeries.includes("denied")}
            name="Denied"
            unit=" App(s)"
          />
          <Bar
            barSize={18}
            dataKey="closed"
            fill={CHART_DEFAULT.closedColor}
            hide={activeSeries.includes("closed")}
            name="Closed"
            unit=" App(s)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
