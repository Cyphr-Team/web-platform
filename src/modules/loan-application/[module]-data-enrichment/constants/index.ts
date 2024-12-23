export const Category = {
  Assets: "Assets",
  Expenses: "Expenses",
  Income: "Income",
  Liabilities: "Liabilities",
  Other: "Other"
}

export const ExpenseFinancialCategory = {
  OperatingExpense: "Operating Expense",
  CostOfGoodsSold: "Cost of Goods Sold"
}

export const RevenueFinancialCategory = {
  UnitSales: "Revenue: Unit Sales",
  BillableHours: "Revenue: Billable Hours",
  RecurringCharges: "Revenue: Recurring Charges",
  ContractRevenue: "Revenue: Contract Revenue",
  Other: "Revenue: Other"
}

export const AssetsPrimary = {
  LoanDisbursements: "Loan Disbursements",
  TransferIn: "Transfer In",
  TransferOut: "Transfer Out"
}

export const ExpensesPrimary = {
  BankFees: "Bank Fees",
  BankPenalties: "Bank Penalties",
  InterestPayments: "Interest Payments",
  Entertainment: "Entertainment",
  Dining: "Dining",
  FoodRetail: "Food Retail",
  GeneralMerchandise: "General Merchandise",
  Medical: "Medical",
  PersonalCare: "Personal Care",
  PetCareAndSupplies: "Pet Care and Supplies",
  ChildcareAndEducation: "Childcare and Education",
  GeneralServices: "General Services",
  GovernmentsAndNonprofit: "Governments and Nonprofit",
  TravelAndTransportation: "Travel and Transportation",
  RentAndUtilities: "Rent and Utilities",
  InsuranceAndTax: "Insurance and Tax"
}

export const IncomePrimary = {
  Income: "Income",
  TaxRefund: "Tax Refund",
  InterestAndDividends: "Interest and Dividends"
}

export const LiabilitiesPrimary = {
  LoanPayments: "Loan Payments"
}

export const OtherPrimary = {
  Other: "Other"
}

export const CategoryToPrimaryMapper = {
  [Category.Assets]: AssetsPrimary,
  [Category.Expenses]: ExpensesPrimary,
  [Category.Income]: IncomePrimary,
  [Category.Liabilities]: LiabilitiesPrimary,
  [Category.Other]: OtherPrimary
}

export const CategoryToFinancialCategoryMapper = {
  [Category.Assets]: {},
  [Category.Expenses]: ExpenseFinancialCategory,
  [Category.Income]: RevenueFinancialCategory,
  [Category.Liabilities]: {},
  [Category.Other]: {}
}
