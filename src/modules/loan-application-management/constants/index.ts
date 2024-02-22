import { Option } from "@/types/common.type"
import { APP_PATH } from "@/constants"
import { AUTHENTICITY_LEVEL, KybDetailLiensData } from "./type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
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
  { label: "Draft", value: LoanApplicationStatus.DRAFT },
  { label: "In Progress", value: LoanApplicationStatus.IN_PROGRESS },
  {
    label: "Third Party Pending",
    value: LoanApplicationStatus.THIRD_PARTY_PENDING
  },
  {
    label: "Third Party Approved",
    value: LoanApplicationStatus.THIRD_PARTY_APPROVED
  },
  {
    label: "Third Party Rejected",
    value: LoanApplicationStatus.THIRD_PARTY_REJECTED
  },
  { label: "Cancelled", value: LoanApplicationStatus.CANCELLED },
  { label: "Underwritten", value: LoanApplicationStatus.UNDERWRITTEN }
]

export const LOAN_PRODUCTS: Option[] = [{ label: "Micro Loan", value: "MICRO" }]

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

export const FAKE_CAPTURE_W2_DATA = {
  data: [
    {
      fieldName: "box9",
      fieldValue: ""
    },
    {
      fieldName: "year",
      fieldValue: "2018"
    },
    {
      fieldName: "box12aCode",
      fieldValue: ""
    },
    {
      fieldName: "box12bCode",
      fieldValue: ""
    },
    {
      fieldName: "box12cCode",
      fieldValue: ""
    },
    {
      fieldName: "box12dcode",
      fieldValue: ""
    },
    {
      fieldName: "box14Other",
      fieldValue: ""
    },
    {
      fieldName: "box12aAmount",
      fieldValue: ""
    },
    {
      fieldName: "box12bAmount",
      fieldValue: ""
    },
    {
      fieldName: "box12cAmount",
      fieldValue: ""
    },
    {
      fieldName: "box12dAmount",
      fieldValue: ""
    },
    {
      fieldName: "employeeName",
      fieldValue: "DAVID P BECON"
    },
    {
      fieldName: "employerIdNo",
      fieldValue: "32-1203146"
    },
    {
      fieldName: "employerName",
      fieldValue: "WFH ENTERPRISES, INC."
    },
    {
      fieldName: "statePrimary",
      fieldValue: "AL"
    },
    {
      fieldName: "allocatedTips",
      fieldValue: ""
    },
    {
      fieldName: "qualifiedPlans",
      fieldValue: ""
    },
    {
      fieldName: "retirementPlan",
      fieldValue: "CHECKED"
    },
    {
      fieldName: "stateSecondary",
      fieldValue: ""
    },
    {
      fieldName: "statutoryEmployee",
      fieldValue: "UNCHECKED"
    },
    {
      fieldName: "employeeAddressZip",
      fieldValue: "35570"
    },
    {
      fieldName: "employerAddressZip",
      fieldValue: "36330"
    },
    {
      fieldName: "socialSecurityTips",
      fieldValue: "450.00"
    },
    {
      fieldName: "third-PartySickPay",
      fieldValue: "UNCHECKED"
    },
    {
      fieldName: "wagesTipsOtherComp",
      fieldValue: "10000.00"
    },
    {
      fieldName: "employeeAddressCity",
      fieldValue: "HAMILTON"
    },
    {
      fieldName: "employerAddressCity",
      fieldValue: "ENTERPRISE"
    },
    {
      fieldName: "localityNamePrimary",
      fieldValue: ""
    },
    {
      fieldName: "medicareTaxWithheld",
      fieldValue: "740.00"
    },
    {
      fieldName: "socialSecurityWages",
      fieldValue: "20000.00"
    },
    {
      fieldName: "employeeAddressLine1",
      fieldValue: "1706 MILITARY STREET SOUTH"
    },
    {
      fieldName: "employeeAddressLine2",
      fieldValue: "AVE 2506"
    },
    {
      fieldName: "employeeAddressState",
      fieldValue: "AL"
    },
    {
      fieldName: "employerAddressLine1",
      fieldValue: "600 BOLL WEEVIL CIRCLE"
    },
    {
      fieldName: "employerAddressLine2",
      fieldValue: ""
    },
    {
      fieldName: "employerAddressState",
      fieldValue: "AL"
    },
    {
      fieldName: "medicareWagesAndTips",
      fieldValue: "652.00"
    },
    {
      fieldName: "dependentCareBenefits",
      fieldValue: ""
    },
    {
      fieldName: "localIncomeTaxPrimary",
      fieldValue: "30.00"
    },
    {
      fieldName: "localWagesTipsPrimary",
      fieldValue: "260.00"
    },
    {
      fieldName: "localityNameSecondary",
      fieldValue: ""
    },
    {
      fieldName: "stateIncomeTaxPrimary",
      fieldValue: "320.00"
    },
    {
      fieldName: "stateWagesTipsPrimary",
      fieldValue: "6520.00"
    },
    {
      fieldName: "localIncomeTaxSecondary",
      fieldValue: ""
    },
    {
      fieldName: "localWagesTipsSecondary",
      fieldValue: ""
    },
    {
      fieldName: "stateIncomeTaxSecondary",
      fieldValue: ""
    },
    {
      fieldName: "stateWagesTipsSecondary",
      fieldValue: ""
    },
    {
      fieldName: "federalIncomeTaxWithheld",
      fieldValue: "15000.00"
    },
    {
      fieldName: "socialSecurityTaxWithheld",
      fieldValue: "25000.00"
    },
    {
      fieldName: "employeeSocialSecurityNumber",
      fieldValue: "653-32-0120"
    },
    {
      fieldName: "employerStateIdNumberPrimary",
      fieldValue: "203-62-1230"
    },
    {
      fieldName: "employerStateIdNumberSecondary",
      fieldValue: ""
    }
  ]
}

export const FAKE_CAPTURE_BANK_STATEMENT_DATA = {
  transactions: [
    {
      amount: "450.00",
      transactionDate: "08/10/2020",
      description: "CHASE ATM 08/10 #000002667 DEPOSIT 1608 AVE M BROOKLYN NY"
    },
    {
      amount: "275.65",
      transactionDate: "08/12/2020",
      description:
        "SQUARE INC DES *CASH APP ID :T210623548125 INDN :JILL SMITH CO [ ... ]"
    },
    {
      amount: "-325.00",
      transactionDate: "08/12/2020",
      description:
        "CHECKCARD 0812 LIBERTY PAPER SUPPLIES # 633 COURT ST [ ... ]"
    },
    {
      amount: "600.00",
      transactionDate: "08/12/2020",
      description: "CHASE ATM 08/12 #000002686 DEPOSIT 1608 AVE M BROOKLYN NY"
    },
    {
      amount: "90.00",
      transactionDate: "08/13/2020",
      description:
        "ONLINE BANKING TRANSFER FROM CHK 2580 CONFIMATION# 2351315828"
    },
    {
      amount: "-1235.47",
      transactionDate: "08/13/2020",
      description:
        "CHECKCARD 0813 TUNA MED FOOD BROOKLYN NY 12294650031344735553451"
    },
    {
      amount: "-227.14",
      transactionDate: "08/15/2020",
      description:
        "CHECKCARD 0815 NGUYEN COFFEE SUPPLY # 341 KNICKERBOCKER AVE [ ... ]"
    },
    {
      amount: "550.00",
      transactionDate: "08/15/2020",
      description: "CHASE ATM 08/15 #000002687 DEPOSIT 1608 AVE M BROOKLYN NY"
    },
    {
      amount: "893.44",
      transactionDate: "08/16/2020",
      description: "VENMO CASHOUT PPD ID : 3592118565"
    },
    {
      amount: "-6.14",
      transactionDate: "08/17/2020",
      description:
        "CHECKCARD 0817 PUBLIX # 228 BROOKLYN NY 15203341941830373962756"
    },
    {
      amount: "450.00",
      transactionDate: "08/17/2020",
      description: "CHASE ATM 08/17 # 000002717 DEPOSIT 1608 AVE M BROOKLYN NY"
    },
    {
      amount: "-4000.00",
      transactionDate: "08/19/2020",
      description:
        "ONLINE BANKING TRANSFER TO CHK 8759 CONFIRMATION # 2454385332"
    },
    {
      amount: "-10.75",
      transactionDate: "08/21/2020",
      description:
        "MTA * METROCARD 08/21 # 000003214 PURCHASE MTA * METROCARD / PAT [ ... ]"
    },
    {
      amount: "-54.25",
      transactionDate: "08/23/2020",
      description:
        "MEDRA H 08/23 # 000315425 WITHDRWL 789 BROAD STREET BROOKLYN NY"
    },
    {
      amount: "-12.42",
      transactionDate: "08/28/2020",
      description: "CHECKCARD 0623 2 FRIENDS DELI & GROCER BROOKLYN NY [ ... ]"
    },
    {
      amount: "29.00",
      transactionDate: "09/04/2020",
      description:
        "ONLINE BANKING TRANSFER FROM CHK 2580 CONFIMATION # 2415004514"
    },
    {
      amount: "-1.99",
      transactionDate: "09/07/2020",
      description: "CHECKCARD 0907 GOOGLE * GOOGLE MOUNT VIEWLA"
    },
    {
      amount: "-31.01",
      transactionDate: "09/07/2020",
      description:
        "ONLINE BANKING TRANSFER TO CHK 2580 CONFIRMATION # 1326566495"
    },
    {
      amount: "-63.14",
      transactionDate: "09/08/2020",
      description: "CHECKCARD 0623 2 FRIENDS DELI & GROCER BROOKLYN NY [ ... ]"
    }
  ],
  bankAccount: [
    {
      bankAccountPk: "17740447",
      name: "381053654285 CHASE SAVINGS",
      bankName: "CHASE",
      accountType: "SAVINGS",
      accountHolder: "JILL SMITH",
      accountNumber: "381053654285",
      holderZip: "11215",
      holderCountry: "US",
      holderState: "NY",
      holderCity: "NEW YORK",
      holderAddress1: "307 8TH AVENUE PARK SLOPE",
      holderAddress2: "Apartment 3B",
      accountCategory: "PERSONAL ACCOUNT"
    }
  ]
}

export const FAKE_CAPTURE_PAYSTUB_DATA = {
  employerInformation: {
    name: "INSTANT CARD NATIONAL",
    addressLine1: "2712 WHITE RIVER AVE.",
    addressLine2: "",
    city: "OAKLAND",
    state: "CA",
    zip: "94621"
  },
  employeeInformation: {
    name: "TAMIKA S. NOTE",
    addressLine1: "4654 SYCAMORE ST.",
    addressLine2: "APT 3",
    city: "SAN JOSE",
    state: "CA",
    zip: "95113",
    maritalStatus: "SINGLE",
    taxIdType: "SSN",
    last4Digits: "1234"
  },
  payStubDetail: {
    payPeriodStartDate: "2022-03-04",
    payPeriodEndDate: "2022-03-17",
    netPay: "963.60",
    payDate: "2022-03-18",
    frequency: "BI_WEEKLY",
    provider: "ADP"
  },
  payDistribution: [
    {
      description: "FEDERAL CREDIT UNION CHECKING 3328",
      bankName: "FEDERAL CREDIT UNION",
      bankAccountType: "CHECKING",
      accountNumber: "3328",
      amount: "863.60"
    },
    {
      description: "UNION CREDIT BANK SAVINGS 5252",
      bankName: "UNION CREDIT BANK",
      bankAccountType: "SAVINGS",
      accountNumber: "5252",
      amount: "100.00"
    }
  ],
  earnings: [
    {
      description: "GROSS PAY",
      currentPay: "1600.00",
      ytdPay: "14850.00",
      currentHours: "80.00"
    },
    {
      description: "ANNUAL BONUS",
      currentPay: "0.00",
      ytdPay: "5250.00"
    },
    {
      description: "REGULAR",
      currentPay: "1600.00",
      ytdPay: "9600.00",
      currentHours: "80.00",
      rate: "20.00"
    }
  ],
  deductions: [
    {
      currentPay: "636.40",
      ytdPay: "5897.35",
      description: "FEDERAL TAX"
    },
    {
      currentPay: "352.00",
      ytdPay: "3267.00",
      description: "STATE TAX"
    },
    {
      currentPay: "99.20",
      ytdPay: "920.70",
      description: "SOCIAL SECURITY"
    },
    {
      currentPay: "23.20",
      ytdPay: "215.36",
      description: "MEDICARE"
    },
    {
      currentPay: "116.00",
      ytdPay: "1076.63",
      description: "CA SDI"
    },
    {
      currentPay: "46.00",
      ytdPay: "417.66",
      description: "CA ETT"
    }
  ]
}
