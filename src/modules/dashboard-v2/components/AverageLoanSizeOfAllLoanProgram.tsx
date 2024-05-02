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

export const AverageLoanSizeOfAllLoanProgram = () => {
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
      date: "Jan",
      demo_loan_program: 200000,
      loan_ready: 250000,
      loan_readiness: 212500
    },
    {
      date: "Feb",
      demo_loan_program: 300000,
      loan_ready: 30000,
      loan_readiness: 325000
    },
    {
      date: "Mar",
      demo_loan_program: 10000,
      loan_ready: 5000,
      loan_readiness: 125000
    }
  ]
  const keys = Object.keys(frameData[0]).filter((v) => v !== "date")

  return (
    <div className="mt-8 bg-white p-4 md:p-6 rounded-xl border">
      <h2 className="mb-4 text-xl text-zinc-500">
        Average Loan Size of All Loan Programs
      </h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={frameData} margin={{ left: 20, top: 10 }}>
            <CartesianGrid {...CARTESIAN_GRID} />
            <Tooltip
              cursor={{ fill: "transparent" }}
              wrapperClassName="text-sm"
            />

            <XAxis dataKey="date" fontSize={CHART_DEFAULT.fontSize} />
            <YAxis
              fontSize={CHART_DEFAULT.fontSize}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => toCurrency(value, 0)}
            />

            <Legend
              onClick={(props) => handleLegendClick(props.dataKey as string)}
              iconType="square"
              wrapperStyle={{ fontSize: "0.875rem", top: -8 }}
              verticalAlign="top"
              align="center"
            />

            {keys.map((key, index) => (
              <Bar
                hide={activeSeries.includes(key)}
                key={key}
                unit="$"
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
