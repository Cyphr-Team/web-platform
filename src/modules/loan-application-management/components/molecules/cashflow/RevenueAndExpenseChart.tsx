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
import { TimePeriodsSelection } from "../filters/TimePeriodsSelection"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { NoData } from "../../atoms/NoData"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { useState } from "react"
import { useQueryGetRevenueAndExpense } from "@/modules/loan-application-management/hooks/useQuery/cash-flow/useQueryGetRevenueExpense"
import { useParams } from "react-router-dom"

export function RevenueAndExpenseChart() {
  const [periodFilter, setPeriodFilter] = useState<GRAPH_FREQUENCY>(
    GRAPH_FREQUENCY.MONTHLY
  )
  const params = useParams()

  const { isFetchingBankAccount, filters } = useLoanApplicationDetailContext()

  const handleChangeTimePeriod = (timePeriod: string) => {
    setPeriodFilter(timePeriod as GRAPH_FREQUENCY)
  }

  const revenueAndExpenseQuery = useQueryGetRevenueAndExpense({
    applicationId: params.id!,
    filters: {
      accountFilter: filters.accountFilter ?? [],
      frequency: periodFilter ?? GRAPH_FREQUENCY.MONTHLY,
      timeRangeFilter: filters.timeRangeFilter
    }
  })

  return (
    <Card className="mt-4 p-4 gap-4 min-h-40">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Revenue vs Expense</h3>
        {!!revenueAndExpenseQuery.data?.revenueVsExpenseGraph.length && (
          <TimePeriodsSelection
            onChangeTimePeriod={handleChangeTimePeriod}
            timePeriod={periodFilter}
          />
        )}
      </div>
      <LoadingWrapper
        isLoading={
          isFetchingBankAccount ||
          revenueAndExpenseQuery.isLoading ||
          revenueAndExpenseQuery.isFetching
        }
      >
        {revenueAndExpenseQuery.data?.revenueVsExpenseGraph.length ? (
          <ResponsiveContainer width="90%" height={500}>
            <BarChart
              data={revenueAndExpenseQuery.data?.revenueVsExpenseGraph}
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
