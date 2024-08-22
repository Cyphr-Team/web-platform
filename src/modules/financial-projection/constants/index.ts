export const enum INPUT_GROUP {
  REVENUE = "Revenue",
  EXPENSES = "Expenses",
  ASSETS_AND_EQUITY = "Assets and Equity",
  REVIEW_AND_GENERATE = "Review and Generate"
}

export const GROUPED_FINANCIAL_ITEM = {
  [INPUT_GROUP.REVENUE]: [
    "Recurring Charges",
    "Contract Revenue",
    "Unit Sales",
    "Billable Hours"
  ],
  [INPUT_GROUP.EXPENSES]: [
    "People",
    "Costs of Goods Sold",
    "General & Admin",
    "Taxes"
  ],
  [INPUT_GROUP.ASSETS_AND_EQUITY]: [
    "Assets",
    "Liabilities",
    "Debt Schedule",
    "Equity"
  ],
  [INPUT_GROUP.REVIEW_AND_GENERATE]: ["Export Forecast For Use"]
}

export const enum SCREEN {
  // [INPUT_GROUP.REVENUE]
  INPUT_RECURRING_CHARGES = "Recurring Charges",
  INPUT_CONTRACT_REVENUE = "Contract Revenue",
  INPUT_UNIT_SALES = "Unit Sales",
  INPUT_BILLABLE_HOURS = "Billable Hours",

  // [INPUT_GROUP.EXPENSES]
  INPUT_PEOPLE = "People",
  INPUT_COST_OF_GOODS_SOLD = "Costs of Goods Sold",
  INPUT_GENERAL_ADMIN = "General & Admin",
  INPUT_TAXES = "Taxes",

  // [INPUT_GROUP.ASSETS_AND_EQUITY]
  INPUT_ASSETS = "Assets",
  INPUT_LIABILITIES = "Liabilities",
  INPUT_DEBT_SCHEDULE = "Debt Schedule",
  INPUT_EQUITY = "Equity",

  // [INPUT_GROUP.REVIEW_AND_GENERATE]
  EXPORT_FORECAST_FOR_USE = "Export Forecast For Use",

  // Another group (if still needed)
  ASSUMPTIONS = "Assumptions",
  INCOME = "Income",
  BALANCE = "Balance",
  CASH_FLOW = "Cash Flow"
}
