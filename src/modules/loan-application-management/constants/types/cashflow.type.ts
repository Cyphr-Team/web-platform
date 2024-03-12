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
