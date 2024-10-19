import { type GRAPH_FREQUENCY } from "../cashflow.type"

interface TimeRange {
  from: string | null
  to: string | null
}

export interface BaseCashFlowFilters {
  timeRangeFilter: TimeRange
}

export interface RevenueExpenseFilters extends BaseCashFlowFilters {
  frequency: GRAPH_FREQUENCY
}

export interface NoiTotalDebtPaymentFilters extends BaseCashFlowFilters {
  frequency: GRAPH_FREQUENCY
}

export interface BankAccountSummary {
  bankAccountPk?: number
  bankAccountName?: string
  accountHolder?: string
  numDaysNegativeBalance?: number
  beginBalance?: number
  endBalance?: number
  averageDailyBalance?: number
  averageTransactionSize?: number
}

export interface CashFlowGlance {
  revenue?: number
  operatingExpenses?: number
  netOperatingIncome?: number
  operatingMargin?: number
  totalDebtService?: number
  debtServiceCoverage?: number
  debtToIncome?: number
}

export interface CashFlowGlanceResponse {
  bankAccountSummary: BankAccountSummary[]
  cashFlowGlance: CashFlowGlance
}

export interface NoiTotalDebtPaymentGraphType {
  date: string
  tags: NoiTotalDebtPaymentTag
}

export interface NoiTotalDebtPaymentTag {
  noi: number
  totalDebtPayment: number
}

export interface NoiVsTotalDebtPaymentGraphResponse {
  noiVsTotalDebtPaymentGraph: NoiTotalDebtPaymentGraphType[]
}

export interface RevenueExpenseGraph {
  date: string
  tags: RevenueExpenseTag
}

export interface RevenueExpenseTag {
  revenue: number
  expense: number
}

export interface RevenueExpenseGraphResponse {
  revenueVsExpenseGraph: RevenueExpenseGraph[]
}
