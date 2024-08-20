export const enum INPUT_GROUP {
  PROFIT_AND_LOST = "Profit and Lost",
  INITIAL_BALANCES = "Initial Balances",
  FORWARD_BALANCES = "Forward Balances",
  REVIEW_AND_GENERATE = "Review and Generate"
}

export const GROUPED_FINANCIAL_ITEM = {
  [INPUT_GROUP.PROFIT_AND_LOST]: [
    "Revenue",
    "Direct Costs",
    "Operating Expenses",
    "Tax Rates"
  ],
  [INPUT_GROUP.INITIAL_BALANCES]: [
    "Initial Balances",
    "Initial Liabilities",
    "Initial Equity"
  ],
  [INPUT_GROUP.FORWARD_BALANCES]: [
    "Assets",
    "Debt Financing",
    "Equity Financing"
  ],
  [INPUT_GROUP.REVIEW_AND_GENERATE]: ["Export Forecast For Use"]
}

export const enum SCREEN {
  // [INPUT_GROUP.PROFIT_AND_LOST]
  INPUT_REVENUE = "Revenue",
  INPUT_DIRECT_COSTS = "Direct Costs",
  INPUT_OPERATING_EXPENSES = "Operating Expenses",
  INPUT_TAX_RATES = "Tax Rates",

  // [INPUT_GROUP.INITIAL_BALANCES]
  INPUT_INITIAL_BALANCES = "Initial Balances",
  INPUT_INITIAL_LIABILITIES = "Initial Liabilities",
  INPUT_INITIAL_EQUITY = "Initial Equity",

  // [INPUT_GROUP.FORWARD_BALANCES]
  INPUT_ASSETS = "Assets",
  INPUT_DEBT_FINANCING = "Debt Financing",
  INPUT_EQUITY_FINANCING = "Equity Financing",

  // [INPUT_GROUP.REVIEW_AND_GENERATE]
  EXPORT_FORECAST_FOR_USE = "Export Forecast For Use",

  // Another group
  ASSUMPTIONS = "Assumptions",
  INCOME = "Income",
  BALANCE = "Balance",
  CASH_FLOW = "Cash Flow"
}
