import { Card } from "@/components/ui/card"
import { toCurrency } from "@/utils"
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
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import {
  GRAPH_FREQUENCY,
  RevenueExpenseGraphType
} from "@/modules/loan-application-management/constants/types/cashflow.type"
import { useState } from "react"
import { isEnabledCashFlowV2DummyData } from "@/utils/feature-flag.utils"
import { getCashFlowChartMockData } from "@/utils/mock-api.utils"
import { NoData } from "../../../atoms/NoData"
import { TimePeriodsSelection } from "../../../molecules/filters/TimePeriodsSelection"
import revenueAndExpenseMockData from "@/constants/data/cash-flow-revenue-expenses.json"

type Props = {
  filters: {
    from?: Date
    to?: Date
  }
}

export function RevenueAndExpenseChart({ filters }: Props) {
  const [periodFilter, setPeriodFilter] = useState<GRAPH_FREQUENCY>(
    GRAPH_FREQUENCY.MONTHLY
  )

  const handleChangeTimePeriod = (timePeriod: string) => {
    setPeriodFilter(timePeriod as GRAPH_FREQUENCY)
  }

  let data: RevenueExpenseGraphType[]

  if (isEnabledCashFlowV2DummyData()) {
    data = getCashFlowChartMockData(revenueAndExpenseMockData, {
      from: filters.from,
      to: filters.to
    }) as RevenueExpenseGraphType[]
  } else {
    // TODO: Call API to get data
    data = []
  }

  return (
    <Card className="mt-4 p-4 gap-4 min-h-40">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Revenue vs Expense</h3>
        {!!data.length && (
          <TimePeriodsSelection
            onChangeTimePeriod={handleChangeTimePeriod}
            timePeriod={periodFilter}
          />
        )}
      </div>
      <LoadingWrapper isLoading={false}>
        {data?.length ? (
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
                padding={{ right: 20 }}
                angle={-45}
                fontSize={10}
                tickFormatter={(value) => {
                  return value.replace(/-/g, "/")
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
                cursor={{ fill: "transparent" }}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <NoData />
        )}{" "}
      </LoadingWrapper>
    </Card>
  )
}
