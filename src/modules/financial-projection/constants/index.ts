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
