import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import {
  CARTESIAN_GRID,
  CHART_DEFAULT,
  LABEL_CONFIG
} from "../constants/dashboard.constants"
import { useState } from "react"

export const LoanApplicationActivityChart = () => {
  const [activeSeries, setActiveSeries] = useState<Array<string>>([])

  const handleLegendClick = (dataKey: string) => {
    if (activeSeries.includes(dataKey)) {
      setActiveSeries(activeSeries.filter((el) => el !== dataKey))
    } else {
      setActiveSeries((prev) => [...prev, dataKey])
    }
  }

  // Example data, TODO: Replace with API data
  const frameData = [
    {
      name: "Jan",
      total: 100,
      draft: 45,
      submitted: 23,
      inreview: 12,
      approved: 5,
      denied: 10,
      closed: 2
    },
    {
      name: "Feb",
      total: 200,
      draft: 145,
      submitted: 123,
      inreview: 112,
      approved: 15,
      denied: 110,
      closed: 12
    },
    {
      name: "March",
      total: 30,
      draft: 15,
      submitted: 15,
      inreview: 5,
      approved: 4,
      denied: 3,
      closed: 2
    }
  ]

  return (
    <div className="w-full h-[500px] mt-8 bg-white p-4 md:p-6 pr-0 rounded-xl border">
      <h2 className="mb-4 text-xl text-zinc-500">
        Loan Application Activities
      </h2>
      <ResponsiveContainer width="100%" height="95%" className="-mx-8">
        <ComposedChart
          data={frameData.map((v) => ({
            ...v,
            incompleteRate: Math.round((v.draft / v.total) * 100),
            approvalRate: Math.round((v.approved / v.submitted) * 100),
            deniedRate: Math.round((v.denied / v.submitted) * 100)
          }))}
        >
          <CartesianGrid {...CARTESIAN_GRID} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            wrapperClassName="text-sm"
          />

          <XAxis dataKey="name" fontSize={CHART_DEFAULT.fontSize} />
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

          <YAxis
            yAxisId="right"
            type="number"
            dataKey="incompleteRate"
            orientation="right"
            unit="%"
            fontSize={CHART_DEFAULT.fontSize}
            tickLine={false}
            axisLine={false}
          />
          <Line
            hide={activeSeries.includes("incompleteRate")}
            strokeWidth={2}
            id="right"
            type="linear"
            unit="%"
            dataKey="incompleteRate"
            name="Incomplete Rate"
            stroke={CHART_DEFAULT.draftLineColor}
          >
            <LabelList
              {...LABEL_CONFIG}
              dataKey="incompleteRate"
              fill={CHART_DEFAULT.draftLineColor}
              formatter={(value: string) => (value ? `${value}%` : "")}
            />
          </Line>
          <Line
            hide={activeSeries.includes("approvalRate")}
            strokeWidth={2}
            id="right"
            type="linear"
            unit="%"
            dataKey="approvalRate"
            name="Approval Rate"
            stroke={CHART_DEFAULT.approvalLineColor}
          >
            <LabelList
              {...LABEL_CONFIG}
              dataKey="approvalRate"
              fill={CHART_DEFAULT.approvalLineColor}
              formatter={(value: string) => (value ? `${value}%` : "")}
            />
          </Line>
          <Line
            hide={activeSeries.includes("deniedRate")}
            strokeWidth={2}
            id="right"
            type="linear"
            unit="%"
            dataKey="deniedRate"
            name="Denied Rate"
            stroke={CHART_DEFAULT.deniedLineColor}
          >
            <LabelList
              {...LABEL_CONFIG}
              dataKey="deniedRate"
              fill={CHART_DEFAULT.deniedLineColor}
              formatter={(value: string) => (value ? `${value}%` : "")}
            />
          </Line>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
