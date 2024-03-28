import { Card } from "@/components/ui/card"
import { getRandomColor } from "@/modules/loan-application-management/services"
import { toCurrency } from "@/utils"
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
import { TimePeriodsSelection } from "../filters/TimePeriodsSelection"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { NoData } from "../../atoms/NoData"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { useQueryGetBalanceGraph } from "@/modules/loan-application-management/hooks/useQuery/cash-flow/useQueryGetBalanceGraph"
import { useParams } from "react-router-dom"
import { useState } from "react"

export function AccountBalanceChart() {
  const [periodFilter, setPeriodFilter] = useState<GRAPH_FREQUENCY>(
    GRAPH_FREQUENCY.MONTHLY
  )
  const { cashFlowAnalysis, filters } = useLoanApplicationDetailContext()
  const params = useParams()

  const balanceGraphQuery = useQueryGetBalanceGraph({
    applicationId: params.id!,
    filters: {
      accountFilter: filters.accountFilter ?? [],
      frequency: periodFilter ?? GRAPH_FREQUENCY.MONTHLY,
      timeRangeFilter: filters.timeRangeFilter
    }
  })

  const chartLines = cashFlowAnalysis?.bankAccountSummary?.map(
    (bank, index) => (
      <Line
        key={index}
        yAxisId="left"
        type="monotone"
        dataKey={`accounts[${index}].balance`}
        name={bank.bankAccountName}
        stroke={getRandomColor(index)}
      />
    )
  )

  const handleChangeTimePeriod = (timePeriod: string) => {
    setPeriodFilter(timePeriod as GRAPH_FREQUENCY)
  }

  return (
    <Card className="mt-4 p-4 gap-4 min-h-40">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Balance History</h3>
        {balanceGraphQuery.data?.balancesGraph && (
          <TimePeriodsSelection
            onChangeTimePeriod={handleChangeTimePeriod}
            timePeriod={periodFilter ?? GRAPH_FREQUENCY.MONTHLY}
          />
        )}
      </div>
      <LoadingWrapper
        isLoading={balanceGraphQuery.isLoading || balanceGraphQuery.isFetching}
      >
        {balanceGraphQuery.data?.balancesGraph ? (
          <ResponsiveContainer width="90%" height={500}>
            <LineChart
              data={balanceGraphQuery.data?.balancesGraph}
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
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              {chartLines}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <NoData />
        )}
      </LoadingWrapper>
    </Card>
  )
}
