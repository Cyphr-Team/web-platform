export interface HistoricalStatementResponse {
  applicationId: string
  incomeStatement: HistoricalIncomeStatementByDate[]
}

interface HistoricalStatementByDate {
  date: string
}

export interface HistoricalIncomeStatementByDate
  extends HistoricalStatementByDate {
  revenue: number
  cogs: number
  grossProfit: number
  grossProfitMargin: number
  operatingExpenses: number
  ebitda: number
  ebit: number
  interestIncome: number
  interestExpense: number
  taxes: number
  netIncome: number
  netProfitMargin: number
}

export type HistoricalStatementByDateType = HistoricalIncomeStatementByDate

export enum HistoricalIncomeStatementField {
  REVENUE = "revenue",
  COGS = "cogs",
  GROSS_PROFIT = "grossProfit",
  GROSS_PROFIT_MARGIN = "grossProfitMargin",
  OPERATING_EXPENSES = "operatingExpenses",
  EBITDA = "ebitda",
  EBIT = "ebit",
  INTEREST_INCOME = "interestIncome",
  INTEREST_EXPENSE = "interestExpense",
  TAXES = "taxes",
  NET_INCOME = "netIncome",
  NET_PROFIT_MARGIN = "netProfitMargin"
}
