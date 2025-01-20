import { type HistoricalIncomeStatementField } from "@/modules/loan-application/[module]-data-enrichment/types/historical-statements.ts"

export type HistoricalStatementDataRow = {
  [key in HistoricalIncomeStatementField]: number[]
}

/**
 * https://docs.google.com/spreadsheets/d/12iB_p23e47lZyvwgMTcKF6xa-2a-kTxU9C3NOj9cQv4/edit?gid=0#gid=0
 * */
export interface PlaidTransaction {
  id: string

  /**
   * List of PlaidTransaction in case a transaction is grouped
   * */
  originalTransaction?: PlaidTransaction[]

  /**
   * Vendor
   * */
  merchantName?: string

  /**
   * Official Currency
   * */
  currency: string

  /**
   * Account name
   * Example: Plaid savings, Chase, ...
   * */
  accountName: string

  /**
   * Transaction description
   * Example: United Airlines **** REFUND ****, Starbucks, McDonalds #3322
   * */
  description: string

  /**
   * Total amount:
   * Example: 100, -12, 400
   * */
  amount: number

  /**
   * Primary category from Plaid
   * */
  plaidPrimaryCreditCategory?: string

  /**
   * Detailed category from Plaid
   * Example: Bank Fees, Dining, Income, Tax Refund, Other, ...
   * */
  plaidDetailedCreditCategory?: string

  /**
   * Primary Category
   * Example: expense, other, revenue, Assets
   * */
  cyphrPrimaryCreditCategory: string

  /**
   * Detailed category
   * Example: Bank Fees, Dining, Income, Tax Refund, Other, ...
   * */
  cyphrDetailedCreditCategory: string

  /**
   * Financial category
   * Example 1: For revenue, it should be: Revenue: Other, Revenue: Unit Sales, ....
   * */
  cyphrFinancialCategory: string
}
