import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { PlaidTransaction } from "@/modules/loan-application/[module]-data-enrichment/types"
import {
  findByPlaidCategory,
  type TransactionCategorization
} from "@/modules/loan-application/[module]-data-enrichment/constants/mapping-logic.ts"
import { postRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { HISTORICAL_FINANCIALS_QUERY_KEY } from "@/modules/loan-application/[module]-data-enrichment/constants/query-key.ts"
import type { PrimaryCategory } from "@/modules/loan-application/[module]-data-enrichment/constants"

interface UpdateTransactionRequest {
  data: PlaidTransaction[]
  applicationId: string
}

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn({
      data: transactions,
      applicationId
    }: UpdateTransactionRequest) {
      return postRequest({
        path: API_PATH.historicalFinancials.plaidTransaction.updateCategory,
        data: {
          loanApplicationId: applicationId,
          transactions: transactions.map(serializeCategory)
        }
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [HISTORICAL_FINANCIALS_QUERY_KEY.GET_PLAID_TRANSACTIONS]
      })
      queryClient.invalidateQueries({
        queryKey: [
          HISTORICAL_FINANCIALS_QUERY_KEY.GET_HISTORICAL_FINANCIAL_STATEMENTS
        ]
      })
    }
  })
}

const financialMapper: {
  [key in PrimaryCategory]: (txCate: TransactionCategorization) => string
} = {
  expense: (txCate) => {
    if (txCate.cyphrFinancialCategory === "cost_of_goods_sold")
      return "cost_of_goods_sold"

    const logic = findByPlaidCategory(txCate.plaidPrimaryCreditCategory)

    return logic.cyphrFinancialCategory
  },
  revenue: (txCate) => txCate.cyphrFinancialCategory,
  asset: (txCate) => txCate.cyphrFinancialCategory,
  liabilities: (txCate) => txCate.cyphrFinancialCategory,
  other: (txCate) => txCate.cyphrFinancialCategory
}

export function serializeCategory(tx: PlaidTransaction): PlaidTransaction {
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
