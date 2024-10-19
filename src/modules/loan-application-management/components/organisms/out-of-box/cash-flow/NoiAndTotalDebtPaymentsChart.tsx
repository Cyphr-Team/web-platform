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
import { type NoiTotalDebtPaymentGraphType } from "@/modules/loan-application-management/constants/types/v2/cashflow.type"
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
            timePeriod={periodFilter}
            onChangeTimePeriod={handleChangeTimePeriod}
          />
        )}
      </div>
      <LoadingWrapper isLoading={isFetching}>
        {noiTotalDebtPaymentData.length ? (
          <ResponsiveContainer height={500} width="90%">
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
                formatter={(value) =>
                  Number(value) < 0
                    ? `-${Math.abs(Number(value))}`
                    : Number(value)
                }
                wrapperClassName="text-sm"
              />
              <Bar
                dataKey="tags.noi"
                fill="#0088FE"
                name="NOI"
                yAxisId="left"
              />
              <Bar
                dataKey="tags.totalDebtPayment"
                fill="#FFBB28"
                name="Total Debt Payments"
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
