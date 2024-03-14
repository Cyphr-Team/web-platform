import {
  AccountBalanceGraphType,
  AccountSummaryType
} from "@/modules/loan-application-management/constants/types/cashflow.type"
import { getRandomColor } from "@/modules/loan-application-management/services"
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
  data: AccountBalanceGraphType[]
  bankInformation: AccountSummaryType[]
}

export function AccountBalanceChart({ data, bankInformation }: Props) {
  const chartLines = bankInformation?.map((bank, index) => (
    <Line
      key={index}
      yAxisId="left"
      type="monotone"
      dataKey={`accounts[${index}].balance`}
      name={bank.bankAccountName}
      stroke={getRandomColor()}
    />
  ))

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
        {chartLines}
      </LineChart>
    </ResponsiveContainer>
  )
}
