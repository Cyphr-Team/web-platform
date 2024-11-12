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
import { TimePeriodsSelection } from "../../filters/TimePeriodsSelection"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { NoData } from "../../../atoms/NoData"
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
        dataKey={`accounts[${index}].balance`}
        name={bank.bankAccountName}
        stroke={getRandomColor(index)}
        type="monotone"
        yAxisId="left"
      />
    )
  )

  const handleChangeTimePeriod = (timePeriod: string) => {
    setPeriodFilter(timePeriod as GRAPH_FREQUENCY)
  }

  return (
    <Card className="mt-4 min-h-40 gap-4 p-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Balance History</h3>
        {!!balanceGraphQuery.data?.balancesGraph.length && (
          <TimePeriodsSelection
            timePeriod={periodFilter ?? GRAPH_FREQUENCY.MONTHLY}
            onChangeTimePeriod={handleChangeTimePeriod}
          />
        )}
      </div>
      <LoadingWrapper
        isLoading={balanceGraphQuery.isLoading || balanceGraphQuery.isFetching}
      >
        {balanceGraphQuery.data?.balancesGraph.length ? (
          <ResponsiveContainer height={500} width="90%">
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
