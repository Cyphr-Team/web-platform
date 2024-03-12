import { Option } from "@/types/common.type"
import { APP_PATH } from "@/constants"
import { KybDetailLiensData } from "./type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { AccountSummaryType } from "./types/cashflow.type"
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
