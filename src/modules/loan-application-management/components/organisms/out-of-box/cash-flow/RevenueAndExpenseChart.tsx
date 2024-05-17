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
import { useQueryGetRevenueExpenseGraph } from "@/modules/loan-application-management/hooks/useQuery/cash-flow/v2/useQueryGetCashFlowRevenueExpenseGraph"
import { useParams } from "react-router-dom"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { startOfMonth, subMonths } from "date-fns"

export function RevenueAndExpenseChart() {
  const [periodFilter, setPeriodFilter] = useState<GRAPH_FREQUENCY>(
    GRAPH_FREQUENCY.MONTHLY
  )

  const isCashFlowDummyDataFlagOn = isEnabledCashFlowV2DummyData()

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

  let revenueExpenseData: RevenueExpenseGraphType[]

  if (isCashFlowDummyDataFlagOn) {
    revenueExpenseData = getCashFlowChartMockData(revenueAndExpenseMockData, {
      from: newCashFlowFilter.timeRangeFilter.from
        ? new Date(newCashFlowFilter.timeRangeFilter.from)
        : startOfMonth(subMonths(new Date(), 2)),
      to: newCashFlowFilter.timeRangeFilter.from
        ? new Date(newCashFlowFilter.timeRangeFilter.from)
        : new Date()
    }) as RevenueExpenseGraphType[]
  } else {
    revenueExpenseData = data?.revenueVsExpenseGraph ?? []
  }

  return (
    <Card className="mt-4 p-4 gap-4 min-h-40">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Revenue vs Expense</h3>
        {!!revenueExpenseData.length && (
          <TimePeriodsSelection
            onChangeTimePeriod={handleChangeTimePeriod}
            timePeriod={periodFilter}
          />
        )}
      </div>
      <LoadingWrapper isLoading={isFetching}>
        {revenueExpenseData?.length ? (
          <ResponsiveContainer width="90%" height={500}>
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
