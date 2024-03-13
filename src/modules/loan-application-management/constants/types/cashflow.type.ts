export interface AccountSummaryType {
  bankAccountPk: string
  bankAccountName: string
  beginDate: string
  endDate: string
  beginBalance: number
  endBalance: number
  averageDailyBalance: number
  averageTransactionSize: number
  maxDeposit?: number
  maxWithdrawal?: number
  averageDeposit?: number
  averageWithdrawal?: number
  accountHolder: string
  numDaysNegativeBalance: number
}

export interface CashFlowGlanceType {
  totalRevenue: number
  totalExpense: number
  totalLoanProceeds: number
  totalLoanPayments: number
  debtCoverageRatio: number
  totalNsfFeeCount: number
  totalNsfAmount: number
  totalOverdraftFeeCount: number
  totalOverdraftFeeSum: number
}

export interface AccountBalanceGraphType {
  date: string
  accounts: AccountType[]
}

export interface AccountType {
  bankAccountPk: string
  balance?: number
}

export interface RevenueExpenseGraphType {
  date: string
  tags: RevenueExpenseTag
}

export interface RevenueExpenseTag {
  revenue: number
  expense: number
}

export interface SummaryGraphType {
  date: string
  tags: SummaryTag
}

export interface SummaryTag {
  withdrawals: number
  deposits: number
}

export interface ApplicationCashFlow {
  bankAccountSummary: AccountSummaryType[]
  cashFlowGlance: CashFlowGlanceType
  balancesGraph: AccountBalanceGraphType[]
  revenueVsExpenseGraph: RevenueExpenseGraphType[]
  summaryByTransactionTag: SummaryGraphType[]
}
