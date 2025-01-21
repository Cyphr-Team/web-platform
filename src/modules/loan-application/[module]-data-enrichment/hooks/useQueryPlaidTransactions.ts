import { API_PATH } from "@/constants"
import { useQuery } from "@tanstack/react-query"
import type { AxiosError, AxiosResponse } from "axios"
import type { ErrorResponse } from "@/types/common.type.ts"
import { postRequest } from "@/services/client.service.ts"
import { HISTORICAL_FINANCIALS_QUERY_KEY } from "@/modules/loan-application/[module]-data-enrichment/constants/query-key.ts"
import { type PlaidTransaction } from "@/modules/loan-application/[module]-data-enrichment/types"
import { type PrimaryCategory } from "@/modules/loan-application/[module]-data-enrichment/constants"
import { type TransactionCategorization } from "@/modules/loan-application/[module]-data-enrichment/constants/mapping-logic.ts"

interface QueryPlaidTransactionsRequest {
  applicationId: string
  enabled: boolean
  limit?: number
  offset?: number
  categories?: PrimaryCategory[]
}

interface QueryPlaidTransactionResponse {
  transactions: PlaidTransaction[]
}

export const useQueryPlaidTransactions = (
  request: QueryPlaidTransactionsRequest
) => {
  const { applicationId, enabled, limit, offset, categories } = request
  const { firstDateOfLastThreeMonth, lastDateOfLastMonth } = getDateParams()

  return useQuery<QueryPlaidTransactionResponse, AxiosError<ErrorResponse>>({
    queryKey: [HISTORICAL_FINANCIALS_QUERY_KEY.GET_PLAID_TRANSACTIONS],
    enabled: !!applicationId && enabled,
    queryFn: async () => {
      const response: AxiosResponse<QueryPlaidTransactionResponse> =
        await postRequest({
          path: API_PATH.historicalFinancials.plaidTransaction.list,
          data: {
            loanApplicationId: applicationId,
            // TODO: implement has more response
            limit: limit ?? 50,
            offset: offset ?? 0,
            categories: categories,
            fromDate: firstDateOfLastThreeMonth,
            toDate: lastDateOfLastMonth
          }
        })

      return {
        transactions: response.data.transactions.map(deserializeCategory)
      }
    },
    refetchOnMount: "always"
  })
}

function getDateParams() {
  const toDate = new Date()

  toDate.setMonth(toDate.getMonth())
  toDate.setDate(0)
  const lastDateOfLastMonth = toDate.toISOString().split("T")[0]

  toDate.setMonth(toDate.getMonth() - 2)
  const fromDate = new Date(toDate)

  fromDate.setDate(1)
  const firstDateOfLastThreeMonth = fromDate.toISOString().split("T")[0]

  return {
    lastDateOfLastMonth,
    firstDateOfLastThreeMonth
  }
}

const financialMapper: {
  [key in PrimaryCategory]: (txCate: TransactionCategorization) => string
} = {
  expense: (txCate) => {
    if (txCate.cyphrFinancialCategory === "cost_of_goods_sold")
      return "cost_of_goods_sold"

    return "operating_expense"
  },
  revenue: (txCate) => txCate.cyphrFinancialCategory,
  asset: (txCate) => txCate.cyphrFinancialCategory,
  liabilities: (txCate) => txCate.cyphrFinancialCategory,
  other: (txCate) => txCate.cyphrFinancialCategory
}

function deserializeCategory(tx: PlaidTransaction): PlaidTransaction {
  return {
    ...tx,
    cyphrFinancialCategory: financialMapper[
      tx.cyphrPrimaryCreditCategory as PrimaryCategory
    ]({
      plaidPrimaryCreditCategory: tx.plaidPrimaryCreditCategory,
      plaidDetailedCreditCategory: tx.plaidDetailedCreditCategory,
      cyphrPrimaryCreditCategory: tx.cyphrPrimaryCreditCategory,
      cyphrDetailedCreditCategory: tx.cyphrDetailedCreditCategory,
      cyphrFinancialCategory: tx.cyphrFinancialCategory
    })
  }
}
