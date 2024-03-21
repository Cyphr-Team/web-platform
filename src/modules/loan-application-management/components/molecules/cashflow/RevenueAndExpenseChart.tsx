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

export function RevenueAndExpenseChart() {
  const { cashFlowAnalysis, isFetchingCashflow, filters, onChangeTimePeriod } =
    useLoanApplicationDetailContext()

  const handleChangeTimePeriod = (timePeriod: string) => {
    onChangeTimePeriod("revenueVsExpenseFilter", timePeriod)
  }

  return (
    <Card className="mt-4 p-4 gap-4 min-h-40">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Revenue vs Expense</h3>
        {cashFlowAnalysis?.revenueVsExpenseGraph && (
          <TimePeriodsSelection
            onChangeTimePeriod={handleChangeTimePeriod}
            timePeriod={filters.revenueVsExpenseFilter.frequency}
          />
        )}
      </div>
      <LoadingWrapper isLoading={isFetchingCashflow}>
        {cashFlowAnalysis?.revenueVsExpenseGraph ? (
          <ResponsiveContainer width="90%" height={500}>
            <BarChart
              data={cashFlowAnalysis?.revenueVsExpenseGraph}
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
