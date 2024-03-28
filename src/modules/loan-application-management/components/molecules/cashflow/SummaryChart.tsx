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
import { useParams } from "react-router-dom"
import {
  GRAPH_FREQUENCY,
  TRANSACTION_TAG
} from "@/modules/loan-application-management/constants/types/cashflow.type"
import { useState } from "react"
import { useQueryGetTransactionTags } from "@/modules/loan-application-management/hooks/useQuery/cash-flow/useQueryGetTransactionTags"
import { DEFAULT_TRANSACTION_TAGS } from "@/modules/loan-application-management/constants"

export function SummaryChart() {
  const [periodFilter, setPeriodFilter] = useState<GRAPH_FREQUENCY>(
    GRAPH_FREQUENCY.MONTHLY
  )
  const [tags, setTags] = useState<TRANSACTION_TAG[]>(DEFAULT_TRANSACTION_TAGS)

  const params = useParams()

  const { filters, isFetchingBankAccount } = useLoanApplicationDetailContext()

  const onApplyFilter = () => {
    transactionTagsQuery.refetch()
  }

  const handleChangeTimePeriod = (timePeriod: string) => {
    setPeriodFilter(timePeriod as GRAPH_FREQUENCY)
  }

  const onChangeTransactionTags = (tags: TRANSACTION_TAG[]) => {
    setTags(tags)
  }

  const transactionTagsQuery = useQueryGetTransactionTags({
    applicationId: params.id!,
    filters: {
      accountFilter: filters.accountFilter ?? [],
      frequency: periodFilter ?? GRAPH_FREQUENCY.MONTHLY,
      timeRangeFilter: filters.timeRangeFilter,
      tags_filter: tags
    }
  })

  const chartLines = tags.map((tag, index) => (
    <Line
      key={index}
      yAxisId="left"
      type="monotone"
      dataKey={`tags.${tag}`}
      name={capitalizeWords(snakeCaseToText(tag))}
      stroke={getRandomColor(index)}
    />
  ))

  return (
    <Card className="mt-4 p-4 gap-4 min-h-40">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Summary by Transaction Tag</h3>
        {
          <div className="flex gap-2">
            <TransactionTagsFilters
              tags={tags}
              onChangeTransactionTags={onChangeTransactionTags}
              onApplyFilter={onApplyFilter}
            />
            <TimePeriodsSelection
              onChangeTimePeriod={handleChangeTimePeriod}
              timePeriod={periodFilter}
            />
          </div>
        }
      </div>
      <LoadingWrapper
        isLoading={
          isFetchingBankAccount ||
          transactionTagsQuery.isLoading ||
          transactionTagsQuery.isFetching
        }
      >
        {transactionTagsQuery.data?.transactionTags ? (
          <ResponsiveContainer width="90%" height={500}>
            <LineChart
              data={transactionTagsQuery.data?.transactionTags}
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
