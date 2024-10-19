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
import { NoData } from "../../../atoms/NoData"
import { TimePeriodsSelection } from "../../filters/TimePeriodsSelection"
import { TransactionTagsFilters } from "../../../atoms/cashflows/TransactionsTagsFilter"
import { getRandomColor } from "@/modules/loan-application-management/services"
import { useParams } from "react-router-dom"
import {
  GRAPH_FREQUENCY,
  type TRANSACTION_TAG
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
      dataKey={`tags.${tag}`}
      name={capitalizeWords(snakeCaseToText(tag))}
      stroke={getRandomColor(index)}
      type="monotone"
      yAxisId="left"
    />
  ))

  return (
    <Card className="mt-4 p-4 gap-4 min-h-40">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Summary by Transaction Tag</h3>
        {!!transactionTagsQuery.data?.transactionTags.length && (
          <div className="flex gap-2">
            <TransactionTagsFilters
              tags={tags}
              onApplyFilter={onApplyFilter}
              onChangeTransactionTags={onChangeTransactionTags}
            />
            <TimePeriodsSelection
              timePeriod={periodFilter}
              onChangeTimePeriod={handleChangeTimePeriod}
            />
          </div>
        )}
      </div>
      <LoadingWrapper
        isLoading={
          isFetchingBankAccount ||
          transactionTagsQuery.isLoading ||
          transactionTagsQuery.isFetching
        }
      >
        {transactionTagsQuery.data?.transactionTags.length ? (
          <ResponsiveContainer height={500} width="90%">
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
