export interface HistoricalStatementResponse {
  applicationId: string
  incomeStatement: HistoricalIncomeStatementByDate[]
}

interface HistoricalStatementByDate {
  date: string
}

export interface HistoricalIncomeStatementByDate
  extends HistoricalStatementByDate {
  totalRevenue: number
  recurringChargesRevenue: number
  contractRevenue: number
  unitSalesRevenue: number
  billableHoursRevenue: number
  cogs: number
  grossProfit: number
  grossProfitMargin: number
  totalOperatingExpenses: number
  operatingExpensesSalariesAndBenefits: number
  operatingExpensesAccounting: number
  operatingExpensesLegal: number
  operatingExpensesTravel: number
  operatingExpensesUtilities: number
  operatingExpensesRent: number
  operatingExpensesInsurance: number
  operatingExpensesOther: number
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
  REVENUE = "totalRevenue",
  RECURRING_CHARGE_REVENUE = "recurringChargesRevenue",
  CONTRACT_REVENUE = "contractRevenue",
  UNIT_SALES_REVENUE = "unitSalesRevenue",
  BILLABLE_HOURS_REVENUE = "billableHoursRevenue",

  COGS = "cogs",
  GROSS_PROFIT = "grossProfit",
  GROSS_PROFIT_MARGIN = "grossProfitMargin",
  OPERATING_EXPENSES = "totalOperatingExpenses",

  OPERATING_EXPENSES_SALARIES_AND_BENEFITS = "operatingExpensesSalariesAndBenefits",
  OPERATING_EXPENSES_ACCOUNTING = "operatingExpensesAccounting",
  OPERATING_EXPENSES_LEGAL = "operatingExpensesLegal",
  OPERATING_EXPENSES_TRAVEL = "operatingExpensesTravel",
  OPERATING_EXPENSES_UTILITIES = "operatingExpensesUtilities",
  OPERATING_EXPENSES_RENT = "operatingExpensesRent",
  OPERATING_EXPENSES_INSURANCE = "operatingExpensesInsurance",
  OPERATING_EXPENSES_OTHER = "operatingExpensesOther",

  EBITDA = "ebitda",
  EBIT = "ebit",
  INTEREST_INCOME = "interestIncome",
  INTEREST_EXPENSE = "interestExpense",
  TAXES = "taxes",
  NET_INCOME = "netIncome",
  NET_PROFIT_MARGIN = "netProfitMargin"
}
