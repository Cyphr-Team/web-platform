import {
  ForecastPeriod,
  ForecastType
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast"
import { type Transaction } from "@/modules/loan-application/[module]-data-enrichment/components/molecules/TransactionTable.tsx"

export const MOCK_HISTORICAL_INCOME_STATEMENT_DATA = {
  financialForecastSetupId: "abc",
  data: [
    {
      forecastType: ForecastType.BILLABLE_HOUR,
      forecastData: [
        {
          value: 1875.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1913.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1951.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.CONTRACT_REVENUE,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.DEPRECIATION,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.DIRECT_COST_REVENUE,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 195.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.EBIT,
      forecastData: [
        {
          value: -23125.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -36087.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -36244.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.EBITDA,
      forecastData: [
        {
          value: -23125.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -36087.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -36244.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.GROSS_PROFIT,
      forecastData: [
        {
          value: 1875.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1913.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1756.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.GROSS_PROFIT_MARGIN,
      forecastData: [
        {
          value: 1.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.9,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.INTEREST_EXPENSE,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.NET_INCOME,
      forecastData: [
        {
          value: -23125.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -36087.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -36244.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.NET_PROFIT_MARGIN,
      forecastData: [
        {
          value: -12.3333,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -18.8693,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -18.5797,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.OPERATING_EXPENSES,
      forecastData: [
        {
          value: 15000.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 28000.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 28000.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.RECURRING_CHARGE,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.REVENUE,
      forecastData: [
        {
          value: 1875.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1913.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1951.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.SALARIES_AND_BENEFITS,
      forecastData: [
        {
          value: 10000.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 10000.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 10000.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.TAXES,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.TOTAL_OPERATING_EXPENSES,
      forecastData: [
        {
          value: 25000.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 38000.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 38000.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.UNIT_SALE,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    }
  ]
}

export const MOCK_TRANSACTION_DATA: Transaction[] = [
  // Assets
  {
    id: "1",
    category: "Assets",
    accounts: "Plaid savings",
    transaction: "Lorem ipsum",
    primary: "Transfer In",
    total: "$18,000",
    financialCategory: ""
  },
  {
    id: "2",
    category: "Assets",
    accounts: "Chase",
    transaction: "Lorem ipsum",
    primary: "Loan Disbursements",
    total: "$10,000",
    financialCategory: ""
  },
  {
    id: "3",
    category: "Assets",
    accounts: "Bank of America",
    transaction: "Lorem ipsum",
    primary: "Investment Income",
    total: "$15,000",
    financialCategory: ""
  },
  {
    id: "4",
    category: "Assets",
    accounts: "Fidelity",
    transaction: "Lorem ipsum",
    primary: "Stock Dividends",
    total: "$25,000",
    financialCategory: ""
  },
  {
    id: "5",
    category: "Assets",
    accounts: "Wells Fargo",
    transaction: "Lorem ipsum",
    primary: "Savings Interest",
    total: "$7,000",
    financialCategory: ""
  },
  {
    id: "6",
    category: "Assets",
    accounts: "Robinhood",
    transaction: "Lorem ipsum",
    primary: "Stock Sale",
    total: "$12,000",
    financialCategory: ""
  },
  {
    id: "7",
    category: "Assets",
    accounts: "US Bank",
    transaction: "Lorem ipsum",
    primary: "Rental Income",
    total: "$20,000",
    financialCategory: ""
  },
  {
    id: "8",
    category: "Assets",
    accounts: "Capital One",
    transaction: "Lorem ipsum",
    primary: "Cash Deposit",
    total: "$5,500",
    financialCategory: ""
  },
  {
    id: "9",
    category: "Assets",
    accounts: "PNC",
    transaction: "Lorem ipsum",
    primary: "Savings Transfer",
    total: "$8,500",
    financialCategory: ""
  },
  {
    id: "10",
    category: "Assets",
    accounts: "CitiBank",
    transaction: "Lorem ipsum",
    primary: "CD Interest",
    total: "$3,000",
    financialCategory: ""
  },

  // Expenses
  {
    id: "11",
    category: "Expenses",
    accounts: "Chase",
    transaction: "Lorem ipsum",
    primary: "Bank Fees",
    total: "$5,000",
    financialCategory: "Operating Expense"
  },
  {
    id: "12",
    category: "Expenses",
    accounts: "Chase",
    transaction: "Lorem ipsum",
    primary: "General Merchandise",
    total: "$20,000",
    financialCategory: "Cost of Goods Sold"
  },
  {
    id: "13",
    category: "Expenses",
    accounts: "Amex",
    transaction: "Lorem ipsum",
    primary: "Office Supplies",
    total: "$2,000",
    financialCategory: "Operating Expense"
  },
  {
    id: "14",
    category: "Expenses",
    accounts: "Visa",
    transaction: "Lorem ipsum",
    primary: "Utilities",
    total: "$4,000",
    financialCategory: "Operating Expense"
  },
  {
    id: "15",
    category: "Expenses",
    accounts: "MasterCard",
    transaction: "Lorem ipsum",
    primary: "Marketing",
    total: "$7,500",
    financialCategory: "Advertising Expense"
  },
  {
    id: "16",
    category: "Expenses",
    accounts: "Chase",
    transaction: "Lorem ipsum",
    primary: "Insurance",
    total: "$6,000",
    financialCategory: "Operating Expense"
  },
  {
    id: "17",
    category: "Expenses",
    accounts: "US Bank",
    transaction: "Lorem ipsum",
    primary: "Rent",
    total: "$10,000",
    financialCategory: "Operating Expense"
  },
  {
    id: "18",
    category: "Expenses",
    accounts: "CitiBank",
    transaction: "Lorem ipsum",
    primary: "Travel",
    total: "$12,000",
    financialCategory: "Operating Expense"
  },
  {
    id: "19",
    category: "Expenses",
    accounts: "Amex",
    transaction: "Lorem ipsum",
    primary: "Employee Salaries",
    total: "$25,000",
    financialCategory: "Payroll"
  },
  {
    id: "20",
    category: "Expenses",
    accounts: "Wells Fargo",
    transaction: "Lorem ipsum",
    primary: "Depreciation",
    total: "$8,000",
    financialCategory: "Non-Operating Expense"
  },

  // Income
  {
    id: "21",
    category: "Income",
    accounts: "Plaid savings",
    transaction: "Lorem ipsum",
    primary: "Income",
    total: "$30,000",
    financialCategory: ""
  },
  {
    id: "22",
    category: "Income",
    accounts: "Chase",
    transaction: "Lorem ipsum",
    primary: "Consulting",
    total: "$15,000",
    financialCategory: ""
  },
  {
    id: "23",
    category: "Income",
    accounts: "Fidelity",
    transaction: "Lorem ipsum",
    primary: "Dividends",
    total: "$10,000",
    financialCategory: ""
  },
  {
    id: "24",
    category: "Income",
    accounts: "Robinhood",
    transaction: "Lorem ipsum",
    primary: "Stock Gains",
    total: "$25,000",
    financialCategory: ""
  },
  {
    id: "25",
    category: "Income",
    accounts: "CitiBank",
    transaction: "Lorem ipsum",
    primary: "Rental Income",
    total: "$18,000",
    financialCategory: ""
  },
  {
    id: "26",
    category: "Income",
    accounts: "US Bank",
    transaction: "Lorem ipsum",
    primary: "Interest",
    total: "$5,000",
    financialCategory: ""
  },
  {
    id: "27",
    category: "Income",
    accounts: "Plaid savings",
    transaction: "Lorem ipsum",
    primary: "Freelance Work",
    total: "$12,000",
    financialCategory: ""
  },
  {
    id: "28",
    category: "Income",
    accounts: "Wells Fargo",
    transaction: "Lorem ipsum",
    primary: "Commission",
    total: "$8,000",
    financialCategory: ""
  },
  {
    id: "29",
    category: "Income",
    accounts: "PNC",
    transaction: "Lorem ipsum",
    primary: "Consulting",
    total: "$14,000",
    financialCategory: ""
  },
  {
    id: "30",
    category: "Income",
    accounts: "Chase",
    transaction: "Lorem ipsum",
    primary: "Sales Revenue",
    total: "$50,000",
    financialCategory: ""
  },

  // Liabilities
  {
    id: "31",
    category: "Liabilities",
    accounts: "Chase",
    transaction: "Lorem ipsum",
    primary: "Loan Payments",
    total: "$20,000",
    financialCategory: ""
  },
  {
    id: "32",
    category: "Liabilities",
    accounts: "Fidelity",
    transaction: "Lorem ipsum",
    primary: "Credit Card Debt",
    total: "$8,000",
    financialCategory: ""
  },
  {
    id: "33",
    category: "Liabilities",
    accounts: "US Bank",
    transaction: "Lorem ipsum",
    primary: "Mortgage",
    total: "$25,000",
    financialCategory: ""
  },
  {
    id: "34",
    category: "Liabilities",
    accounts: "Wells Fargo",
    transaction: "Lorem ipsum",
    primary: "Auto Loan",
    total: "$12,000",
    financialCategory: ""
  },
  {
    id: "35",
    category: "Liabilities",
    accounts: "Amex",
    transaction: "Lorem ipsum",
    primary: "Credit Card Payment",
    total: "$6,000",
    financialCategory: ""
  },
  {
    id: "36",
    category: "Liabilities",
    accounts: "CitiBank",
    transaction: "Lorem ipsum",
    primary: "Line of Credit",
    total: "$15,000",
    financialCategory: ""
  },
  {
    id: "37",
    category: "Liabilities",
    accounts: "Chase",
    transaction: "Lorem ipsum",
    primary: "Student Loan",
    total: "$9,000",
    financialCategory: ""
  },
  {
    id: "38",
    category: "Liabilities",
    accounts: "Robinhood",
    transaction: "Lorem ipsum",
    primary: "Margin Loan",
    total: "$13,000",
    financialCategory: ""
  },
  {
    id: "39",
    category: "Liabilities",
    accounts: "Fidelity",
    transaction: "Lorem ipsum",
    primary: "Business Loan",
    total: "$20,000",
    financialCategory: ""
  },
  {
    id: "40",
    category: "Liabilities",
    accounts: "Wells Fargo",
    transaction: "Lorem ipsum",
    primary: "Equipment Lease",
    total: "$4,000",
    financialCategory: ""
  },

  // Other
  {
    id: "41",
    category: "Other",
    accounts: "Chase",
    transaction: "Lorem ipsum",
    primary: "Miscellaneous",
    total: "$2,000",
    financialCategory: ""
  },
  {
    id: "42",
    category: "Other",
    accounts: "US Bank",
    transaction: "Lorem ipsum",
    primary: "Donations",
    total: "$1,000",
    financialCategory: ""
  },
  {
    id: "43",
    category: "Other",
    accounts: "CitiBank",
    transaction: "Lorem ipsum",
    primary: "Reimbursements",
    total: "$3,500",
    financialCategory: ""
  },
  {
    id: "44",
    category: "Other",
    accounts: "Wells Fargo",
    transaction: "Lorem ipsum",
    primary: "Gifts",
    total: "$5,000",
    financialCategory: ""
  },
  {
    id: "45",
    category: "Other",
    accounts: "Robinhood",
    transaction: "Lorem ipsum",
    primary: "Royalties",
    total: "$6,000",
    financialCategory: ""
  }
]
