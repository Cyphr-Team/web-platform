import { Option } from "@/types/common.type"
import { APP_PATH } from "@/constants"
import { AUTHENTICITY_LEVEL, KybDetailLiensData } from "./type"
export const APPLICATION_MENU = (id: string) => [
  {
    name: "Overview",
    href: `/application/${id}/overview`
  },
  {
    name: "KYC",
    href: `/application/${id}/kyc`
  },
  {
    name: "KYB",
    href: `/application/${id}/kyb`
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
    name: "Business Plan",
    href: `/application/${id}/business-plan`
  },
  {
    name: "Loan Summary",
    href: `/application/${id}/loan-summary`
  },
  {
    name: "Loan Decision",
    href: `/application/${id}/loan-decision`
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
  { label: "Flagged", value: "Flagged" },
  { label: "Closed", value: "Closed" },
  { label: "Ready", value: "Ready" },
  { label: "In Progress", value: "In Progress" }
]

export const LOAN_PRODUCTS: Option[] = [
  { label: "Revenue Share", value: "Revenue Share" },
  { label: "Emergency", value: "Emergency" },
  { label: "Micro Loan", value: "Micro Loan" },
  { label: "Term Loan", value: "Term Loan" },
  { label: "Credit Line", value: "Credit Line" },
  { label: "SBA", value: "SBA" }
]

export const LOAN_AMOUNT: Option[] = [
  { label: "< $1,000", value: "< $1,000" },
  { label: "$1,000 - $10,000", value: "$1,000 - $10,000" },
  { label: "$10,000 - $20,000", value: "$10,000 - $20,000" },
  { label: "$20,000 - $30,000", value: "$20,000 - $30,000" },
  { label: "$40,000 - $50,000", value: "$40,000 - $50,000" },
  { label: "> $50,000", value: "> $50,000" }
]

export const FAKE_SIGNALS_DATA = {
  signalCount: 4,
  formUuid: "00ebe159-0af5-404c-8fbb-fab9367e55fa",
  uploadedDocDetectStatus: "COMPLETED",
  isImageBasedPdf: false,
  signals: [
    {
      signalIdentifier: "dollarAmount_edits",
      signalDescription: "Dollar Amounts were modified as follows",
      signalDisplayName: "Dollar Amount Edits",
      signalCount: 3,
      signalDetails: [
        {
          fieldName: "amount",
          pageNumber: 2,
          pageDocPk: "456550260",
          tamperedText: "75.00",
          tamperedTextData: {
            value: "75.00",
            bbox: {
              left: 987.9167,
              top: 305.54584,
              right: 1086.8375,
              bottom: 349.29584
            }
          },
          visualizationTypes: [
            {
              visualizationType: "tamper_overview",
              description: ["'amount' does not match expected alignment."]
            },
            {
              visualizationType: "misalignedText",
              description: ["'amount' does not match expected alignment."]
            }
          ]
        },
        {
          fieldName: "amount",
          pageNumber: 2,
          pageDocPk: "456550260",
          tamperedText: "30.00",
          tamperedTextData: {
            value: "30.00",
            bbox: {
              left: 987.9167,
              top: 362.8375,
              right: 1086.8375,
              bottom: 406.5875
            }
          },
          visualizationTypes: [
            {
              visualizationType: "tamper_overview",
              description: ["'amount' does not match expected alignment."]
            },
            {
              visualizationType: "misalignedText",
              description: ["'amount' does not match expected alignment."]
            }
          ]
        },
        {
          fieldName: "amount",
          pageNumber: 2,
          pageDocPk: "456550260",
          tamperedText: "20.00",
          tamperedTextData: {
            value: "20.00",
            bbox: {
              left: 977.5,
              top: 420.12918,
              right: 1076.4208,
              bottom: 463.87918
            }
          },
          visualizationTypes: [
            {
              visualizationType: "tamper_overview",
              description: ["'amount' does not match expected alignment."]
            },
            {
              visualizationType: "misalignedText",
              description: ["'amount' does not match expected alignment."]
            }
          ]
        }
      ],
      tabularData: {
        headers: ["Page", "Tampered Text", "Description"],
        rows: [
          {
            values: ["2", "75.00", "Field is misaligned (tampered)"]
          },
          {
            values: ["2", "30.00", "Field is misaligned (tampered)"]
          },
          {
            values: ["2", "20.00", "Field is misaligned (tampered)"]
          }
        ]
      }
    },
    {
      signalIdentifier: "unreconciledBankStatementBalanceData",
      signalDescription: "Unreconciled Balance",
      signalDisplayName: "Unreconciled Balance",
      signalCount: 1,
      signalDetails: [
        {
          pageNumber: 1,
          pageDocPk: "456550261",
          visualizationTypes: []
        }
      ],
      tabularData: {
        headers: [
          "Page",
          "Stated Beginning Balance",
          "Stated Ending Balance",
          "Calculated Ending Balance",
          "Difference in Ending Balance"
        ],
        rows: [
          {
            values: ["1", "7126.11", "10521.19", "10596.19", "-75.0"]
          }
        ]
      }
    },
    {
      signalIdentifier: "accountNumber_edits",
      signalDescription: "Account Number was modified as follows",
      signalDisplayName: "Account Number Edits",
      signalCount: 0,
      signalDetails: []
    },
    {
      signalIdentifier: "accountHolder_edits",
      signalDescription: "Account Holder was modified as follows",
      signalDisplayName: "Account Holder Edits",
      signalCount: 0,
      signalDetails: []
    },
    {
      signalIdentifier: "accountHolderAddress_edits",
      signalDescription: "Account Holder Address was modified as follows",
      signalDisplayName: "Account Holder Address Edits",
      signalCount: 0,
      signalDetails: []
    },
    {
      signalIdentifier: "unusualDocumentSource",
      signalDescription: "The document was created using",
      signalDisplayName: "Suspicious Document Origin",
      signalCount: 0,
      signalDetails: []
    },
    {
      signalIdentifier: "accountType_edits",
      signalDescription: "Account Type was modified as follows",
      signalDisplayName: "Account Type Edits",
      signalCount: 0,
      signalDetails: []
    },
    {
      signalIdentifier: "date_edits",
      signalDescription: "Dates were modified as follows",
      signalDisplayName: "Date Edits",
      signalCount: 0,
      signalDetails: []
    },
    {
      signalIdentifier: "transactionDescription_edits",
      signalDescription: "Transaction descriptions were modified as follows",
      signalDisplayName: "Transaction Description Edits",
      signalCount: 0,
      signalDetails: []
    },
    {
      signalIdentifier: "page_edited",
      signalDescription: "Editing Software was detected on the following pages",
      signalDisplayName: "Editing Software Detected",
      signalCount: 0,
      signalDetails: []
    },
    {
      signalIdentifier: "invalidBankStatementTxnDate",
      signalDescription: "Invalid Transaction Dates",
      signalDisplayName: "Invalid Transaction Dates",
      signalCount: 0,
      signalDetails: []
    },
    {
      signalIdentifier: "futureDate",
      signalDescription: "Date in Future",
      signalDisplayName: "Date in Future",
      signalCount: 0,
      signalDetails: []
    },
    {
      signalIdentifier: "invalidDate",
      signalDescription: "Invalid Date",
      signalDisplayName: "Invalid Date",
      signalCount: 0,
      signalDetails: []
    }
  ],
  formAuthenticity: {
    authenticityLevel: AUTHENTICITY_LEVEL.MEDIUM,
    title: "Authenticity Score 50/100",
    description:
      "We recommend manually reviewing this document as suspicious signals were found.",
    reasonCodeDescription: [
      {
        reasonCode: "006-M",
        description: "fields misaligned: medium confidence",
        confidence: "MEDIUM",
        shouldHighlight: true
      },
      {
        reasonCode: "150-M",
        description: "bank statement other fields tampered: medium confidence",
        confidence: "MEDIUM",
        shouldHighlight: false
      },
      {
        reasonCode: "170-M",
        description: "bank statement unreconciled balance: medium confidence",
        confidence: "MEDIUM",
        shouldHighlight: false
      }
    ],
    authenticityLevelColor: "#F7B201",
    authenticityScore: 50
  },
  allowRescan: false
}

export const FAKE_VISUALIZATION_DATA = {
  formUuid: "93b36ba5-d6b6-44de-a457-7cb3cdedeabd",
  formType: "BANK_STATEMENT",
  totalSignalCount: 4,
  visualizationsByPage: [
    {
      pageNumber: 1,
      pageDocPk: "457049329",
      visualizations: [
        {
          visualizationIdentifier: "tamper_overview",
          imageUrl: "/example/documents/document_1.png",
          thumbnailSmallUrl:
            "https://app.ocrolus.com/v2/detect/visualization/1531f7a8-23b5-4e4d-b3b5-0295300326fa?size=sm",
          thumbnailMediumUrl: "/example/documents/document_1_md.png"
        }
      ],
      pageSignalCount: 0
    },
    {
      pageNumber: 2,
      pageDocPk: "457049328",
      pageSignalCount: 3,
      visualizations: [
        {
          visualizationIdentifier: "tamper_overview",
          imageUrl: "/example/documents/document_2_1.png",
          thumbnailSmallUrl: "/example/documents/document_2_sm_1.png",
          thumbnailMediumUrl: "/example/documents/document_2_md.png"
        },
        {
          visualizationIdentifier: "misaligned_text",
          imageUrl: "/example/documents/document_2_2.png",
          thumbnailSmallUrl: "/example/documents/document_2_sm_2.png",
          thumbnailMediumUrl: "/example/documents/document_2_md.png"
        }
      ]
    },
    {
      pageNumber: 3,
      pageDocPk: "457049332",
      pageSignalCount: 3,
      visualizations: [
        {
          visualizationIdentifier: "tamper_overview",
          imageUrl: "/example/documents/document_2_1.png",
          thumbnailSmallUrl: "/example/documents/document_2_sm_1.png",
          thumbnailMediumUrl: "/example/documents/document_2_md.png"
        },
        {
          visualizationIdentifier: "misaligned_text",
          imageUrl: "/example/documents/document_2_2.png",
          thumbnailSmallUrl: "/example/documents/document_2_sm_2.png",
          thumbnailMediumUrl: "/example/documents/document_2_md.png"
        },
        {
          visualizationIdentifier: "misaligned_text",
          imageUrl: "/example/documents/document_2_2.png",
          thumbnailSmallUrl: "/example/documents/document_2_sm_2.png",
          thumbnailMediumUrl: "/example/documents/document_2_md.png"
        },
        {
          visualizationIdentifier: "misaligned_text",
          imageUrl: "/example/documents/document_2_2.png",
          thumbnailSmallUrl: "/example/documents/document_2_sm_2.png",
          thumbnailMediumUrl: "/example/documents/document_2_md.png"
        }
      ]
    },
    {
      pageNumber: 4,
      pageDocPk: "457049330",
      pageSignalCount: 3,
      visualizations: [
        {
          visualizationIdentifier: "tamper_overview",
          imageUrl: "/example/documents/document_2_1.png",
          thumbnailSmallUrl: "/example/documents/document_2_sm_1.png",
          thumbnailMediumUrl: "/example/documents/document_2_md.png"
        },
        {
          visualizationIdentifier: "misaligned_text",
          imageUrl: "/example/documents/document_2_2.png",
          thumbnailSmallUrl: "/example/documents/document_2_sm_2.png",
          thumbnailMediumUrl: "/example/documents/document_2_md.png"
        },
        {
          visualizationIdentifier: "misaligned_text",
          imageUrl: "/example/documents/document_2_2.png",
          thumbnailSmallUrl: "/example/documents/document_2_sm_2.png",
          thumbnailMediumUrl: "/example/documents/document_2_md.png"
        },
        {
          visualizationIdentifier: "misaligned_text",
          imageUrl: "/example/documents/document_2_2.png",
          thumbnailSmallUrl: "/example/documents/document_2_sm_2.png",
          thumbnailMediumUrl: "/example/documents/document_2_md.png"
        },
        {
          visualizationIdentifier: "misaligned_text",
          imageUrl: "/example/documents/document_2_2.png",
          thumbnailSmallUrl: "/example/documents/document_2_sm_2.png",
          thumbnailMediumUrl: "/example/documents/document_2_md.png"
        }
      ]
    }
  ],
  visualizationsDescription: {
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
}
