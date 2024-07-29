import { Option } from "@/types/common.type"
import { APP_PATH } from "@/constants"
import { KybDetailLiensData } from "./type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { AccountSummaryType, TRANSACTION_TAG } from "./types/cashflow.type"
import { LoanApplicationStage } from "@/types/application/application-stage.type"

export enum ApplicationMenuName {
  business = "Business Verification",
  identity = "Identity Verification",
  document = "Documents",
  cashflow = "Cash Flow",
  applicationSummary = "Application Summary",
  debtSchedule = "Debt Schedule"
}

export const APPLICATION_MENU = (id: string) => [
  {
    name: ApplicationMenuName.business as string,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detailWithId(
      id
    )
  },
  {
    name: ApplicationMenuName.identity as string,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.KYC.replace(":id", id)
  },
  {
    name: ApplicationMenuName.document as string,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.details(id)
  },
  {
    name: ApplicationMenuName.cashflow as string,
    href: `/application/${id}/cash-flow`
  },
  {
    name: ApplicationMenuName.applicationSummary as string,
    href: `/application/${id}/loan-summary`
  },
  {
    name: ApplicationMenuName.debtSchedule as string,
    href: `/application/${id}/debt-schedule`
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
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#B34D4D",
  "#80B300",
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
  { label: "Ready For Review", value: LoanApplicationStatus.READY_FOR_REVIEW },
  {
    label: "In Review",
    value: LoanApplicationStatus.IN_REVIEW
  },
  { label: "Approved", value: LoanApplicationStatus.APPROVED },
  { label: "Denied", value: LoanApplicationStatus.DENIED },
  { label: "Canceled", value: LoanApplicationStatus.CANCELLED }
]

export const ASSIGNABLE_STAGE: Option[] = [
  { label: "Round 1", value: LoanApplicationStage.ROUND_1 },
  { label: "Round 2", value: LoanApplicationStage.ROUND_2 }
]

export const SCORED_STATUS: Option[] = [
  { label: "Incomplete scorecard", value: "false" },
  { label: "Scorecard Submitted", value: "true" }
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

export const DEFAULT_TRANSACTION_TAGS = [
  TRANSACTION_TAG.DEPOSITS,
  TRANSACTION_TAG.WITHDRAWALS
]
