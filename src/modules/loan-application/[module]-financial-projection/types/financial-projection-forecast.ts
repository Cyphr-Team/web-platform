export const enum ForecastType {
  /**
   * Cash flow statement
   * */
  BEGINNING_CASH = "beginningCash",
  CHANGE_IN_ACCOUNT_PAYABLE = "changeInAccountPayable",
  CHANGE_IN_ACCOUNT_RECEIVABLE = "changeInAccountReceivable",
  CHANGE_IN_CASH = "changeInCash",
  CHANGE_IN_FIXED_ASSET = "changeInFixedAsset",
  CHANGE_IN_PAID_IN_CAPITAL = "changeInPaidInCapital",
  DEPRECIATION = "depreciation",
  ENDING_CASH = "endingCash",
  LONG_TERM_DEBT = "longTermDebt",
  NET_INCOME = "netIncome",
  REPAYMENT_OF_DEBT = "repaymentOfDebt",
  TOTAL_FINANCING_CASH_FLOW = "totalFinancingCashFlow",
  TOTAL_INVESTING_CASH_FLOW = "totalInvestingCashFlow",
  TOTAL_OPERATING_CASH_FLOWS = "totalOperatingCashFlows",

  /**
   * Balance sheet
   * */
  ACCOUNT_PAYABLE = "accountPayable",
  ACCOUNT_RECEIVABLE = "accountReceivable",
  ACCUMULATED_DEPRECIATION = "accumulatedDepreciation",
  ACCUMULATED_RETAINED_EARNINGS = "accumulatedRetainedEarnings",
  CASH = "cash",
  FIXED_ASSET = "fixedAsset",
  PAID_IN_CAPITAL = "paidInCapital",
  TOTAL_ASSETS = "totalAssets",
  TOTAL_CURRENT_ASSETS = "totalCurrentAssets",
  TOTAL_EQUITY = "totalEquity",
  TOTAL_LIABILITIES = "totalLiabilities",
  TOTAL_LIABILITY_AND_EQUITY = "totalLiabilityAndEquity",

  /**
   * Income statement
   * */
  BILLABLE_HOUR = "billableHour",
  CONTRACT_REVENUE = "contractRevenue",
  DIRECT_COST_REVENUE = "directCostRevenue",
  EBIT = "ebit",
  EBITDA = "ebitda",
  GROSS_PROFIT = "grossProfit",
  GROSS_PROFIT_MARGIN = "grossProfitMargin",
  INTEREST_EXPENSE = "interestExpense",
  NET_PROFIT_MARGIN = "netProfitMargin",
  OPERATING_EXPENSES = "operatingExpenses",
  RECURRING_CHARGE = "recurringCharge",
  REVENUE = "revenue",
  SALARIES_AND_BENEFITS = "salariesAndBenefits",
  TAXES = "taxes",
  TOTAL_OPERATING_EXPENSES = "totalOperatingExpenses",
  UNIT_SALE = "unitSale"
}

export const enum ForecastPeriod {
  MONTHLY = "MONTHLY",
  ANNUALLY = "ANNUALLY"
}

export interface ForecastDataPoint {
  value: number
  forecastDate: string
  forecastPeriod: ForecastPeriod
}

interface ForecastDataCategory {
  forecastType: ForecastType
  forecastData: ForecastDataPoint[]
}

export interface ForecastResultsResponse {
  financialForecastSetupId: string
  cashFlowForecastMonthly: ForecastDataCategory[]
  balanceSheetForecastMonthly: ForecastDataCategory[]
  incomeStatementForecastMonthly: ForecastDataCategory[]
  cashFlowForecastAnnually: ForecastDataCategory[]
  balanceSheetForecastAnnually: ForecastDataCategory[]
  incomeStatementForecastAnnually: ForecastDataCategory[]
}
