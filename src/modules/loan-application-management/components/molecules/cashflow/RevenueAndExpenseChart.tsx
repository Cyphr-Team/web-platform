import { RevenueExpenseGraphType } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { toCurrency } from "@/utils"
import { format } from "date-fns"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

type Props = {
  data: RevenueExpenseGraphType[]
}

export function RevenueAndExpenseChart({ data }: Props) {
  return (
    <ResponsiveContainer width="90%" height={500}>
      <BarChart
        data={data}
        margin={{
          top: 40,
          right: 5,
          left: 50,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          name="Revenue"
          dataKey="tags.revenue"
          fill="#4da50d"
          yAxisId="left"
        />
        <Bar
          name="Expense"
          dataKey="tags.expense"
          fill="#CA1010"
          yAxisId="left"
        />

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
      </BarChart>
    </ResponsiveContainer>
  )
}
