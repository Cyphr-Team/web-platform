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
  type RevenueExpenseGraphType
} from "@/modules/loan-application-management/constants/types/cashflow.type"
import { useState } from "react"
import { NoData } from "../../../atoms/NoData"
import { TimePeriodsSelection } from "../../../molecules/filters/TimePeriodsSelection"
import { useQueryGetRevenueExpenseGraph } from "@/modules/loan-application-management/hooks/useQuery/cash-flow/v2/useQueryGetCashFlowRevenueExpenseGraph"
import { useParams } from "react-router-dom"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"

export function RevenueAndExpenseChart() {
  const [periodFilter, setPeriodFilter] = useState<GRAPH_FREQUENCY>(
    GRAPH_FREQUENCY.MONTHLY
  )

  const params = useParams()

  const handleChangeTimePeriod = (timePeriod: string) => {
    setPeriodFilter(timePeriod as GRAPH_FREQUENCY)
  }

  const { newCashFlowFilter } = useLoanApplicationDetailContext()

  const { data, isFetching } = useQueryGetRevenueExpenseGraph({
    applicationId: params.id!,
    filters: {
      frequency: periodFilter ?? GRAPH_FREQUENCY.MONTHLY,
      timeRangeFilter: newCashFlowFilter.timeRangeFilter
    }
  })

  const revenueExpenseData: RevenueExpenseGraphType[] =
    data?.revenueVsExpenseGraph ?? []

  return (
    <Card className="mt-4 p-4 gap-4 min-h-40">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Revenue vs Expense</h3>
        {!!revenueExpenseData.length && (
          <TimePeriodsSelection
            timePeriod={periodFilter}
            onChangeTimePeriod={handleChangeTimePeriod}
          />
        )}
      </div>
      <LoadingWrapper isLoading={isFetching}>
        {revenueExpenseData?.length ? (
          <ResponsiveContainer height={500} width="90%">
            <BarChart
              data={revenueExpenseData}
              margin={{
                top: 40,
                right: 5,
                left: 50,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="tags.revenue"
                fill="#4da50d"
                name="Revenue"
                yAxisId="left"
              />
              <Bar
                dataKey="tags.expense"
                fill="#CA1010"
                name="Expense"
                yAxisId="left"
              />

              <XAxis
                angle={-45}
                dataKey="date"
                fontSize={10}
                interval="preserveStartEnd"
                padding={{ right: 20 }}
                tickFormatter={(value) => {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                  return value.replace(/-/g, "/")
                }}
                tickMargin={20}
              />
              <YAxis
                fontSize={12}
                tickFormatter={(value) => toCurrency(value)}
                yAxisId="left"
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                formatter={(value) => toCurrency(Number(value))}
                wrapperClassName="text-sm"
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
