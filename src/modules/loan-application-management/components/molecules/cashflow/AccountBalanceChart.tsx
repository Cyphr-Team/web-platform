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

export function AccountBalanceChart() {
  const { cashFlowAnalysis, isFetchingCashflow, filters, onChangeTimePeriod } =
    useLoanApplicationDetailContext()

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
    onChangeTimePeriod("balanceFilter", timePeriod)
  }

  return (
    <Card className="mt-4 p-4 gap-4 min-h-40">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Balance History</h3>
        {cashFlowAnalysis?.balancesGraph && (
          <TimePeriodsSelection
            onChangeTimePeriod={handleChangeTimePeriod}
            timePeriod={filters.balanceFilter.frequency}
          />
        )}
      </div>
      <LoadingWrapper isLoading={isFetchingCashflow}>
        {cashFlowAnalysis?.balancesGraph ? (
          <ResponsiveContainer width="90%" height={500}>
            <LineChart
              data={cashFlowAnalysis.balancesGraph}
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
