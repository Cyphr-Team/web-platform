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
  revenueVsExpenseGraph: RevenueExpenseGraphType[]
  summaryByTransactionTag: SummaryGraphType[]
}

export interface BankAccount {
  bankAccountPk: string
  bankAccountName: string
}

export interface BankAccountsResponse {
  bankAccounts: BankAccount[]
}

export interface BalanceGraphResponse {
  balancesGraph: AccountBalanceGraphType[]
}

type TimeRange = {
  from: string | null
  to: string | null
}

export enum GRAPH_FREQUENCY {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly"
}

export type FrequencyFilter = {
  frequency: GRAPH_FREQUENCY
}

export interface BalanceGraphsFilters {
  frequency: GRAPH_FREQUENCY
  accountFilter: string[]
  timeRangeFilter: TimeRange
}

type TransactionTagFilter = {
  frequency: GRAPH_FREQUENCY
  tags: TRANSACTION_TAG[]
}
export interface CashFlowRequestFilters {
  timeRangeFilter: TimeRange
  accountFilter?: string[]
  revenueVsExpenseFilter: FrequencyFilter
  summaryByTransactionTagFilter: TransactionTagFilter
}

export enum TRANSACTION_TAG {
  NSF = "nsf",
  WITHDRAWALS = "withdrawals",
  DEPOSITS = "deposits",
  OVERDRAFT = "overdraft",
  REVENUE = "revenue",
  EXPENSE = "expense",
  ATM = "atm",
  BANK_BRANCH = "bank_branch",
  BANK_CASH_ADVANCE = "bank_cash_advance",
  BANK_LOAN = "bank_loan",
  BANK = "bank",
  CASH_REWARDS = "cash_rewards",
  CHECKS = "checks",
  CREDIT_BUILDER = "credit_builder",
  CREDIT_CARD = "credit_card",
  CRYPTO = "crypto",
  DEBIT_CARD = "debit_card",
  DEBT_CONSOLIDATOR = "debt_consolidator",
  EQUIPMENT_LEASE = "equipment_lease",
  FACTORING = "factoring",
  FEDERAL_TAX = "federal_tax",
  FIN_TECH = "fin_tech",
  FIN_TECH_LOAN = "fin_tech_loan",
  FIN_TECH_MCA = "fin_tech_mca",
  GAMBLING = "gambling",
  INSURANCE = "insurance",
  INTERNAL_TRANSFER = "internal_transfer",
  INVESTMENT = "investment",
  MERCHANT_SERVICE_TRANSFER = "merchant_service_transfer",
  OTHER_LOAN = "other_loan",
  OTHER_TRANSFER = "other_transfer",
  OUTSIDE_SOURCE_DEPOSITS = "outside_source_deposits",
  PAYPAL = "paypal",
  PAYROLL = "payroll",
  PAYROLL_TAX = "payroll_tax",
  PROBABLE_RECURRING_TXNS = "probable_recurring_txns",
  REMOTE = "remote",
  RETURNED_ITEM = "returned_item",
  REVENUE_DEDUCTION = "revenue_deduction",
  REVENUE_DEDUCTION_OTHER = "revenue_deduction_other",
  REVERSED = "reversed",
  SBA = "sba",
  STATE_TAX = "state_tax",
  TOLLS = "tolls",
  TRUCK_STOPS = "truck_stops",
  TXN_FIVE_ZEROS = "txn_five_zeros",
  TXN_FOUR_ZEROS = "txn_four_zeros",
  VENMO_ZELLE_CASHAPP = "venmo_zelle_cashapp",
  WIRE_TRANSFER = "wire_transfer"
}
