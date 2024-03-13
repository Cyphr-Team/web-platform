import { Option } from "@/types/common.type"
import { APP_PATH } from "@/constants"
import { KybDetailLiensData } from "./type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import {
  AccountBalanceGraphType,
  AccountSummaryType,
  RevenueExpenseGraphType,
  SummaryGraphType
} from "./types/cashflow.type"
export const APPLICATION_MENU = (id: string) => [
  {
    name: "Business Verification",
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detailWithId(
      id
    )
  },
  {
    name: "Documents",
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.details(id)
  },
  {
    name: "Cash Flow",
    href: `/application/${id}/cash-flow`
  },
  {
    name: "Loan Summary",
    href: `/application/${id}/loan-summary`
  }
]

export const KYC_STATUS = {
  VERIFIED: "VERIFIED",
  UNVERIFIED: "UNVERIFIED",
  FAILED: "FAILED",
  UNCHECKED: "UNCHECKED",
  PASSED: "PASSED"
}

export const STATE_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  UNKNOWN: "UNKNOWN"
}

export const RANDOM_LINE_COLORS = [
  "#FF6633",
  "#FFB399",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF1A66",
  "#E6331A",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#4DB3FF",
  "#1AB399",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF"
]

export const UNKNOWN_VALUE = "N/A"

export const FAKE_LIENS_DATA = [
  {
    type: "ucc",
    date: "2021-04-01",
    status: "OPEN",
    securedParties: [
      "C T CORPORATION SYSTEM, AS REPRESENTATIVE",
      "C T CORPORATION SYSTEM, AS REPRESENTATIVE"
    ],
    fileUrl: [
      "https://storage.googleapis.com/...",
      "https://storage.googleapis.com/..."
    ]
  }
] as KybDetailLiensData[]

export const LOAN_STATUS: Option[] = [
  { label: "Draft", value: LoanApplicationStatus.DRAFT },
  { label: "Submitted", value: LoanApplicationStatus.SUBMITTED },
  {
    label: "In Review",
    value: LoanApplicationStatus.IN_REVIEW
  },
  { label: "Approved", value: LoanApplicationStatus.APPROVED },
  { label: "Denied", value: LoanApplicationStatus.DENIED },
  { label: "Canceled", value: LoanApplicationStatus.CANCELLED }
]

export const LOAN_PRODUCTS: Option[] = [{ label: "Micro Loan", value: "MICRO" }]

export const FAKE_ACCOUNT_SUMMARY_DATA = [
  {
    bankAccountPk: "18174737",
    bankAccountName: "988081483 CHASE CHECKING",
    beginDate: "2008-07-01",
    endDate: "2008-07-31",
    beginBalance: 81607.4,
    endBalance: 189296.31,
    averageDailyBalance: 139421.28,
    averageTransactionSize: 9004.9,
    maxDeposit: 33138,
    maxWithdrawal: -8928,
    averageDeposit: 12588.36,
    averageWithdrawal: -3032.45,
    accountHolder: "",
    numDaysNegativeBalance: 0
  },
  {
    bankAccountPk: "18174723",
    accountHolder: "Oleh Beshleu",
    bankAccountName: "45201526 LLOYDS BANK CHECKING",
    beginDate: "2019-09-01",
    endDate: "2023-11-30",
    beginBalance: 1173.56,
    endBalance: 2062.05,
    averageDailyBalance: 3111.04,
    averageTransactionSize: 219.56,
    maxDeposit: 960,
    maxWithdrawal: -340,
    averageDeposit: 677.52,
    averageWithdrawal: -111.81,
    numDaysNegativeBalance: 0
  }
] as AccountSummaryType[]

export const VISUALIZATION_DESCRIPTION = {
  tamperOverview: {
    displayName: "Tamper Overview",
    description:
      "Tampered fields are highlighted in red. For further detail on what was edited, click through for additional visualizations."
  },
  editRegions: {
    displayName: "Received Document",
    description:
      "The original document was recovered. Changes between the received document and the original document are highlighted in red to reveal edits."
  },
  originalPdf: {
    displayName: "Recovered Original Document",
    description:
      "The original document was recovered. Changes between the received document and the original document are highlighted in red to reveal edits."
  },
  tamperedFonts: {
    displayName: "Tampered fonts",
    description:
      "Multiple fonts have been used within the same field. Within a field, fonts are distinguished by different color highlights. When possible, added fonts are shown in red. In some cases, three or more fonts are used within a single field and additional colors will be shown."
  },
  addedFonts: {
    displayName: "Added Fonts",
    description: "Text that was added to the document is highlighted in red."
  },
  overwrittenText: {
    displayName: "Overwritten Text",
    description:
      "Text has been added over existing text. In most cases a green highlight will show where the original text was with new text highlighted in red. If only green or red highlights are available, that is still a signal that text has been overwritten."
  },
  misalignedText: {
    displayName: "Misaligned Text",
    description:
      "Fields are not aligned as expected. Gray lines indicate expected alignments. Misaligned fields are highlighted in red, with misaligned characters emphasized."
  },
  postWhiteoutContent: {
    displayName: "Received Document",
    description:
      "Some of the text on this document has been obscured. The box(es) used to hide text are shown in grey. Text changes between the received document and the pre-redacted document are highlighted in red to reveal edits. The font on the Recovered Document may be different as it is a reconstructed doc and not all fonts used by financial institutions are available for use."
  },
  preWhiteoutContent: {
    displayName: "Recovered Document",
    description:
      "Some of the text on this document has been obscured. The box(es) used to hide text are shown in grey. Text changes between the received document and the pre-redacted document are highlighted in red to reveal edits. The font on the Recovered Document may be different as it is a reconstructed doc and not all fonts used by financial institutions are available for use."
  }
}

export const CASH_FLOW_GLANCE = [
  {
    title: "Debt Coverage Ratio",
    key: "debtCoverageRatio",
    description:
      "(Total revenue - total expense + total loan payments) / (Total loan payments)"
  },
  {
    title: "Total Loan Payments",
    key: "totalLoanPayments",
    description:
      "Sum of withdrawals tagged as Fintech Loan, fintech MCA, Bank Loan, and Other Loan",
    isCurrency: true
  },
  {
    title: "Total Revenue",
    key: "totalRevenue",
    description: "Sum of all transactions that are tagged as revenue",
    isCurrency: true
  },
  {
    title: "Total Expense",
    key: "totalExpense",
    description: "Sum of all debit transactions minus internal transfers",
    isCurrency: true
  },
  {
    title: "Total Loan Proceeds",
    key: "totalLoanProceeds",
    description:
      "Sum of deposits tagged as Fintech Loan, fintech MCA, Bank Loan, and Other Loan",
    isCurrency: true
  },
  {
    title: "Total NSF Count",
    key: "totalNsfFeeCount",
    description:
      "Count of withdraws that are considered as Non-Sufficient Funds",
    isNegative: true
  },
  {
    title: "Total NSF Amount",
    key: "totalNsfAmount",
    description: "Sum of all transactions that are considered NSF fees",
    isNegative: true
  },
  {
    title: "Overdraft Fee Count",
    key: "totalOverdraftFeeCount",
    description: "Count of transactions that are considered overdraft fees",
    isNegative: true
  },
  {
    title: "Total Overdraft Amount",
    key: "totalOverdraftFeeSum",
    description: "Sum of all transactions that are considered overdraft fees",
    isNegative: true
  }
]

export const CASH_FLOW_GLANCE_FAKE_DATA = {
  totalRevenue: 100000,
  totalExpense: 50000,
  totalLoanProceeds: 20000,
  totalLoanPayments: 30000,
  debtCoverageRatio: 2,
  totalNsfFeeCount: 5,
  totalNsfAmount: 100,
  totalOverdraftFeeCount: 2,
  totalOverdraftFeeSum: 50
}

export const FAKE_GRAPH_BALANCE_DATA: AccountBalanceGraphType[] = [
  {
    date: "2008-07-01",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 81607.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-02",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 98727.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-03",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 98727.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-04",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 98727.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-05",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 98727.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-06",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 98727.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-07",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 98727.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-08",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 98727.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-09",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 123337.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-10",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 123337.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-11",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 123337.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-12",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 123337.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-13",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 123337.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-14",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 134761.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-15",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 136110.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-16",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 136110.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-17",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 136110.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-18",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 136110.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-19",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 136110.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-20",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 136110.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-21",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 144230.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-22",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 144230.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-23",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 177368.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-24",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 177368.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-25",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 177368.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-26",

    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 177368.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-27",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 177368.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-28",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 195482.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-29",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 195482.4
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-30",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-08-01",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723"
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 203032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 203032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 203032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 203032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 203032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 203032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 203032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 203032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 203032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 203032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 203032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 201032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 202032.33
      }
    ]
  },
  {
    date: "2008-07-31",
    accounts: [
      {
        bankAccountPk: "18174737",
        balance: 207491.03
      },
      {
        bankAccountPk: "18174723",
        balance: 200032.33
      }
    ]
  }
]

export const FAKE_REVENUE_EXPENSE_DATA: RevenueExpenseGraphType[] = [
  {
    date: "2021-04-01",
    tags: {
      revenue: 15000,
      expense: 7000
    }
  },
  {
    date: "2021-04-04",
    tags: {
      revenue: 11000,
      expense: 5500
    }
  },
  {
    date: "2021-04-05",
    tags: {
      revenue: 10500,
      expense: 5250
    }
  },
  {
    date: "2021-04-06",
    tags: {
      revenue: 11500,
      expense: 5750
    }
  },
  {
    date: "2021-04-07",
    tags: {
      revenue: 12500,
      expense: 6250
    }
  },
  {
    date: "2021-04-08",
    tags: {
      revenue: 13500,
      expense: 6750
    }
  },
  {
    date: "2021-04-09",
    tags: {
      revenue: 14500,
      expense: 7250
    }
  },
  {
    date: "2021-04-10",
    tags: {
      revenue: 15500,
      expense: 7750
    }
  },
  {
    date: "2021-04-11",
    tags: {
      revenue: 16500,
      expense: 8250
    }
  },
  {
    date: "2021-04-12",
    tags: {
      revenue: 17500,
      expense: 8750
    }
  },
  {
    date: "2021-04-13",
    tags: {
      revenue: 18500,
      expense: 9250
    }
  },
  {
    date: "2021-04-14",
    tags: {
      revenue: 19500,
      expense: 9750
    }
  },
  {
    date: "2021-04-15",
    tags: {
      revenue: 20500,
      expense: 10250
    }
  },
  {
    date: "2021-04-16",
    tags: {
      revenue: 21500,
      expense: 10750
    }
  },
  {
    date: "2021-04-17",
    tags: {
      revenue: 22500,
      expense: 11250
    }
  },
  {
    date: "2021-04-18",
    tags: {
      revenue: 23500,
      expense: 11750
    }
  },
  {
    date: "2021-04-19",
    tags: {
      revenue: 24500,
      expense: 12250
    }
  },
  {
    date: "2021-04-20",
    tags: {
      revenue: 25500,
      expense: 12750
    }
  },
  {
    date: "2021-04-21",
    tags: {
      revenue: 26500,
      expense: 13250
    }
  },
  {
    date: "2021-04-22",
    tags: {
      revenue: 27500,
      expense: 13750
    }
  },
  {
    date: "2021-04-23",
    tags: {
      revenue: 28500,
      expense: 14250
    }
  },
  {
    date: "2021-04-24",
    tags: {
      revenue: 29500,
      expense: 14750
    }
  },
  {
    date: "2021-04-25",
    tags: {
      revenue: 30500,
      expense: 15250
    }
  },
  {
    date: "2021-04-26",
    tags: {
      revenue: 31500,
      expense: 15750
    }
  },
  {
    date: "2021-04-27",
    tags: {
      revenue: 32500,
      expense: 16250
    }
  },
  {
    date: "2021-04-28",
    tags: {
      revenue: 33500,
      expense: 16750
    }
  },
  {
    date: "2021-04-29",
    tags: {
      revenue: 34500,
      expense: 17250
    }
  },
  {
    date: "2021-04-30",
    tags: {
      revenue: 35500,
      expense: 17750
    }
  }
]

export const FAKE_SUMMARY_DATA: SummaryGraphType[] = [
  {
    date: "2021-04-01",
    tags: {
      withdrawals: 10000,
      deposits: 5000
    }
  },
  {
    date: "2021-04-02",
    tags: {
      withdrawals: 12000,
      deposits: 6000
    }
  },
  {
    date: "2021-04-03",
    tags: {
      withdrawals: 15000,
      deposits: 7000
    }
  },
  {
    date: "2021-04-04",
    tags: {
      withdrawals: 11000,
      deposits: 5500
    }
  },
  {
    date: "2021-04-05",
    tags: {
      withdrawals: 10500,
      deposits: 5250
    }
  },
  {
    date: "2021-04-06",
    tags: {
      withdrawals: 11500,
      deposits: 5750
    }
  },
  {
    date: "2021-04-07",
    tags: {
      withdrawals: 12500,
      deposits: 6250
    }
  },
  {
    date: "2021-04-08",
    tags: {
      withdrawals: 13500,
      deposits: 6750
    }
  },
  {
    date: "2021-04-09",
    tags: {
      withdrawals: 14500,
      deposits: 7250
    }
  },
  {
    date: "2021-04-10",
    tags: {
      withdrawals: 15500,
      deposits: 7750
    }
  },
  {
    date: "2021-04-11",
    tags: {
      withdrawals: 16500,
      deposits: 8250
    }
  },
  {
    date: "2021-04-12",
    tags: {
      withdrawals: 17500,
      deposits: 8750
    }
  },
  {
    date: "2021-04-13",
    tags: {
      withdrawals: 18500,
      deposits: 9250
    }
  },
  {
    date: "2021-04-14",
    tags: {
      withdrawals: 19500,
      deposits: 9750
    }
  },
  {
    date: "2021-04-15",
    tags: {
      withdrawals: 20500,
      deposits: 10250
    }
  },
  {
    date: "2021-04-16",
    tags: {
      withdrawals: 21500,
      deposits: 10750
    }
  },
  {
    date: "2021-04-17",
    tags: {
      withdrawals: 22500,
      deposits: 11250
    }
  },
  {
    date: "2021-04-18",
    tags: {
      withdrawals: 23500,
      deposits: 11750
    }
  },
  {
    date: "2021-04-19",
    tags: {
      withdrawals: 24500,
      deposits: 12250
    }
  },
  {
    date: "2021-04-20",
    tags: {
      withdrawals: 25500,
      deposits: 12750
    }
  },
  {
    date: "2021-04-21",
    tags: {
      withdrawals: 26500,
      deposits: 13250
    }
  },
  {
    date: "2021-04-22",
    tags: {
      withdrawals: 27500,
      deposits: 13750
    }
  },
  {
    date: "2021-04-23",
    tags: {
      withdrawals: 28500,
      deposits: 14250
    }
  },
  {
    date: "2021-04-24",
    tags: {
      withdrawals: 29500,
      deposits: 14750
    }
  },
  {
    date: "2021-04-25",
    tags: {
      withdrawals: 30500,
      deposits: 15250
    }
  },
  {
    date: "2021-04-26",
    tags: {
      withdrawals: 31500,
      deposits: 15750
    }
  },
  {
    date: "2021-04-27",
    tags: {
      withdrawals: 32500,
      deposits: 16250
    }
  },
  {
    date: "2021-04-28",
    tags: {
      withdrawals: 33500,
      deposits: 16750
    }
  },
  {
    date: "2021-04-29",
    tags: {
      withdrawals: 34500,
      deposits: 17250
    }
  },
  {
    date: "2021-04-30",
    tags: {
      withdrawals: 35500,
      deposits: 17750
    }
  }
]
