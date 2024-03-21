import { Card } from "@/components/ui/card"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { capitalizeWords, snakeCaseToText, toCurrency } from "@/utils"
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
import { NoData } from "../../atoms/NoData"
import { TimePeriodsSelection } from "../filters/TimePeriodsSelection"
import { TransactionTagsFilters } from "../../atoms/cashflows/TransactionsTagsFilter"
import { getRandomColor } from "@/modules/loan-application-management/services"

export function SummaryChart() {
  const { cashFlowAnalysis, isFetchingCashflow, filters, onChangeTimePeriod } =
    useLoanApplicationDetailContext()

  const handleChangeTimePeriod = (timePeriod: string) => {
    onChangeTimePeriod("summaryByTransactionTagFilter", timePeriod)
  }

  const chartLines = filters.summaryByTransactionTagFilter.tags.map(
    (tag, index) => (
      <Line
        key={index}
        yAxisId="left"
        type="monotone"
        dataKey={`tags.${tag}`}
        name={capitalizeWords(snakeCaseToText(tag))}
        stroke={getRandomColor(index)}
      />
    )
  )

  return (
    <Card className="mt-4 p-4 gap-4 min-h-40">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Summary by Transaction Tag</h3>
        {cashFlowAnalysis?.summaryByTransactionTag && (
          <div className="flex gap-2">
            <TransactionTagsFilters />
            <TimePeriodsSelection
              onChangeTimePeriod={handleChangeTimePeriod}
              timePeriod={filters.summaryByTransactionTagFilter.frequency}
            />
          </div>
        )}
      </div>
      <LoadingWrapper isLoading={isFetchingCashflow}>
        {cashFlowAnalysis?.summaryByTransactionTag ? (
          <ResponsiveContainer width="90%" height={500}>
            <LineChart
              data={cashFlowAnalysis?.summaryByTransactionTag}
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
