export type PrimaryCategory =
  | "asset"
  | "revenue"
  | "expense"
  | "liabilities"
  | "other"

export type ColumnType = "primary" | "detailed" | "financial"

/**
 * TODO: find another effective way to structure these constant. Currently it was duplicated with TRANSACTION_MAPPING_LOGIC
 * */
export const UserPlaidTransactionConstant: Record<
  ColumnType,
  Record<PrimaryCategory, object | string>
> = {
  primary: {
    asset: "Assets",
    expense: "Expense",
    revenue: "Revenue",
    liabilities: "Liabilities",
    other: "Other"
  },
  detailed: {
    asset: {
      loanDisbursements: "Loan Disbursements",
      transferIn: "Transfer In",
      transferOut: "Transfer Out"
    },
    liabilities: {
      loanPayments: "Loan Payments"
    },
    revenue: {
      revenue: "Income",
      taxRefund: "Tax Refund",
      interestsAndDividends: "Interest And Dividends",
      incomeSalary: "Income Salary",
      incomeGovernmentIncome: "Income Government",
      incomeOther: "Income Other"
    },
    expense: {
      bankFees: "Bank Fees",
      bankPenalties: "Bank Penalties",
      interestPayments: "Interest Payments",
      entertainment: "Entertainment",
      meals: "Dining",
      foodRetail: "Food Retail",
      generalMerchandise: "General Merchandise",
      medical: "Medical",
      personalCare: "Personal Care",
      petCareAndSupplies: "Pet Care and Supplies",
      childcareAndEducation: "Childcare and Education",
      generalServices: "General Services",
      governmentsAndNonProfit: "Governments and Nonprofit",
      travel: "Travel and Transportation",
      rentAndUtilities: "Rent and Utilities",
      insuranceAndTax: "Insurance and Tax"
    },
    other: {
      other: "Other"
    }
  },
  financial: {
    expense: {
      operatingExpense: "Operating Expense",
      costOfGoodsSold: "Cost of Goods Sold"
    },
    revenue: {
      revenueUnitSales: "Revenue: Unit Sales",
      revenueBillableHours: "Revenue: Billable Hours",
      revenueRecurringCharges: "Revenue: Recurring Charges",
      revenueContractRevenue: "Revenue: Contract Revenue",
      revenueOther: "Revenue: Other"
    },
    asset: "",
    liabilities: "",
    other: ""
  }
}
