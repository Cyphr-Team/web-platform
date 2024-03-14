import { SummaryGraphType } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { toCurrency } from "@/utils"
import { format } from "date-fns"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

type Props = {
  data: SummaryGraphType[]
}

export function SummaryChart({ data }: Props) {
  return (
    <ResponsiveContainer width="90%" height={500}>
      <LineChart
        data={data}
        margin={{
          top: 40,
          right: 5,
          left: 50,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          interval={"preserveStartEnd"}
          tickMargin={20}
          angle={-45}
          fontSize={10}
          tickFormatter={(value) => {
            const date = new Date(value)
            return format(date, "MM/dd/yy")
          }}
        />
        <YAxis
          yAxisId="left"
          tickFormatter={(value) => `${toCurrency(value)}`}
          fontSize={12}
        />
        <Tooltip
          formatter={(value) => toCurrency(Number(value))}
          wrapperClassName="text-sm"
        />
        <Legend wrapperStyle={{ paddingTop: 20 }} />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey={`tags.deposits`}
          name={"Deposits"}
          stroke={"#CA1010"}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey={`tags.withdrawals`}
          name={"Withdrawals"}
          stroke="#000"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
