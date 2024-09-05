export type SignalsType = {
  signalIdentifier: string // "account_number_edits"
  signalIdentifierDescription: string //"Account Number was modified as follows"
  signalDisplayName: string //"Account Number Edits"
  signalCount: number
  tabularData: TabularData
  page?: number
}

type TabularHeader = {
  [key: string]: string
}

export type TabularData = {
  headers: TabularHeader[]
  rows: TabularDataRows[]
}

export type TabularDataRows = {
  values: (string | null)[]
}
export type SignalsDetectType = {
  signals: SignalsType[]
  formAuthenticity: AuthenticityType
  signalCount: number
}

// type AuthenticityType = {
//   authenticityLevel: AUTHENTICITY_LEVEL
//   title: string
//   description: string
//   reasonCodeDescription: AuthenticityReason[]
//   authenticityLevelColor: string
//   authenticityScore: number
// }

export type AuthenticityReason = {
  reasonCode?: string
  description: string
  confidence: string
  shouldHighlight?: boolean
}

export enum AUTHENTICITY_LEVEL {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  UNKNOWN = "UNKNOWN"
}

export type VisualizationType = {
  formUuid: string
  formType: string
  totalSignalCount: number
  visualizationsByPage: VisualizationPage[]
  visualizationsDescription: VisualizationDescription
}

export type VisualizationPage = {
  pageNumber: number
  pageDocPk: string
  visualizations: Visualization[]
  pageSignalCount: number
}

export type Visualization = {
  visualizationIdentifier: string
  imageUrl: string
  thumbnailSmallUrl: string
  thumbnailMediumUrl: string
}

export type VisualizationDescription = {
  tamperOverview: Description
  editRegions: Description
  originalPdf: Description
  tamperedFonts: Description
  addedFonts: Description
  overwrittenText: Description
  misalignedText: Description
  postWhiteoutContent: Description
  preWhiteoutContent: Description
}

export type Description = {
  displayName: string
  description: string
}

export type BankStatementType = {
  transactions: BankTransaction[]
  bankAccount: BankAccount[]
}

type BankTransaction = {
  pageIndex?: number
  description: string
  amount: string
  transactionDate: string
}

export type BankAccount = {
  bankAccountPk?: string
  name: string
  bankName: string
  accountNumber: string
  accountType: string
  accountHolder: string
  holderZip: string
  holderAddress1: string
  holderAddress2: string
  holderCity: string
  holderState: string
  holderCountry: string
  accountCategory: string
}

export type W2DocumentType = {
  data: W2DocumentData[]
}

type W2DocumentData = {
  fieldName: string
  fieldValue: string
}

export type EmployerInformationType = {
  name: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
}

export type EmployeeInformationType = {
  name: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
  maritalStatus: string
  taxIdType: string
  last4Digits: string
}

export type PayStubType = {
  payPeriodStartDate: string
  payPeriodEndDate: string
  netPay: string
  payDate: string
  provider: string
  frequency: string
}

export type PayStubDistributionType = {
  description: string
  bankName: string
  bankAccountType: string
  accountNumber: string
  amount: string
}

export type PayStubEarningType = {
  description?: string
  currentPay?: string
  ytdPay?: string
  currentHours?: string
  rate?: string
}

export type PayStubDeductionType = {
  currentPay: string
  ytdPay: string
  description: string
}

export type PayStubCapturedType = {
  employeeInformation: EmployeeInformationType
  employerInformation: EmployerInformationType
  payStubDetail: PayStubType
  earnings: PayStubEarningType[]
  deductions: PayStubDeductionType[]
  payDistribution: PayStubDistributionType[]
}

export enum DocumentType {
  BANK_STATEMENT = "bank_statement",
  W2 = "form",
  PAY_STUB = "paystub",
  EXECUTIVE_SUMMARY = "executive_summary",
  PITCH_DECK = "pitch_deck",
  BUSINESS_EIN_LETTER = "business_ein_letter",
  CERTIFICATE_OF_GOOD_STANDING = "certificate_of_good_standing",
  FICTITIOUS_NAME_CERTIFICATION = "fictitious_name_certification",
  ARTICLES_OF_ORGANIZATION_AND_OPERATING_AGREEMENT = "articles_of_organization_and_operating_agreement",
  BY_LAWS = "by_laws",
  E_SIGN = "e_sign"
}

export type AuthenticityType = {
  score: number
  reasonCode: AuthenticityReason[]
}

export type DocumentDetailsType = {
  documentType: DocumentType
  documentStatus: string
  detect: {
    visualizations: DocumentVisualization[]
    signals: SignalsType[]
    formAuthenticity: AuthenticityType
  }
  capture: PayStubCapturedType | BankStatementType | W2DocumentType
  verifiedDate: string
}

export type DocumentVisualization = {
  pageNumber: number
  pageVisualizations: PageVisualization[]
}

type PageVisualization = {
  imageUrl: string
  displayName: string
  visualType: string
  description: string
}

export type DocumentDetectType = {
  detectData: SignalsDetectType
  visualizationData: VisualizationType
}

export type SignalsCoordinatesType = {
  left: number
  top: number
  right: number
  bottom: number
}
