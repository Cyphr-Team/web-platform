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
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { useState } from "react"
import { NoData } from "../../../atoms/NoData"
import { TimePeriodsSelection } from "../../../molecules/filters/TimePeriodsSelection"
import { useParams } from "react-router-dom"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { NoiTotalDebtPaymentGraphType } from "@/modules/loan-application-management/constants/types/v2/cashflow.type"
import { useQueryGetNoiTotalDebtPaymentGraph } from "@/modules/loan-application-management/hooks/useQuery/cash-flow/v2/useQueryGetCashFlowNoiTotalDebtPaymentGraph"

export function NoiAndTotalDebtPaymentsChart() {
  const [periodFilter, setPeriodFilter] = useState<GRAPH_FREQUENCY>(
    GRAPH_FREQUENCY.MONTHLY
  )

  const params = useParams()

  const handleChangeTimePeriod = (timePeriod: string) => {
    setPeriodFilter(timePeriod as GRAPH_FREQUENCY)
  }

  const { newCashFlowFilter } = useLoanApplicationDetailContext()

  const { data, isFetching } = useQueryGetNoiTotalDebtPaymentGraph({
    applicationId: params.id!,
    filters: {
      frequency: periodFilter ?? GRAPH_FREQUENCY.MONTHLY,
      timeRangeFilter: newCashFlowFilter.timeRangeFilter
    }
  })

  const noiTotalDebtPaymentData: NoiTotalDebtPaymentGraphType[] =
    data?.noiVsTotalDebtPaymentGraph ?? []

  return (
    <Card className="mt-4 p-4 gap-4 min-h-40">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">NOI vs Debt Payments</h3>
        {!!noiTotalDebtPaymentData.length && (
          <TimePeriodsSelection
            onChangeTimePeriod={handleChangeTimePeriod}
            timePeriod={periodFilter}
          />
        )}
      </div>
      <LoadingWrapper isLoading={isFetching}>
        {noiTotalDebtPaymentData.length ? (
          <ResponsiveContainer width="90%" height={500}>
            <BarChart
              data={noiTotalDebtPaymentData}
              margin={{
                top: 40,
                right: 5,
                left: 50,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                cursor={{ fill: "transparent" }}
                wrapperClassName="text-sm"
                formatter={(value) =>
                  Number(value) < 0
                    ? `-${Math.abs(Number(value))}`
                    : Number(value)
                }
              />
              <Bar
                name="NOI"
                dataKey="tags.noi"
                fill="#0088FE"
                yAxisId="left"
              />
              <Bar
                name="Total Debt Payments"
                dataKey="tags.totalDebtPayment"
                fill="#FFBB28"
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
