export interface SignalsType {
  signalIdentifier: string // "account_number_edits"
  signalIdentifierDescription: string //"Account Number was modified as follows"
  signalDisplayName: string //"Account Number Edits"
  signalCount: number
  tabularData: TabularData
  page?: number
}

type TabularHeader = Record<string, string>

export interface TabularData {
  headers: TabularHeader[]
  rows: TabularDataRows[]
}

export interface TabularDataRows {
  values: (string | null)[]
}

export interface SignalsDetectType {
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

export interface AuthenticityReason {
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

export interface VisualizationType {
  formUuid: string
  formType: string
  totalSignalCount: number
  visualizationsByPage: VisualizationPage[]
  visualizationsDescription: VisualizationDescription
}

export interface VisualizationPage {
  pageNumber: number
  pageDocPk: string
  visualizations: Visualization[]
  pageSignalCount: number
}

export interface Visualization {
  visualizationIdentifier: string
  imageUrl: string
  thumbnailSmallUrl: string
  thumbnailMediumUrl: string
}

export interface VisualizationDescription {
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

export interface Description {
  displayName: string
  description: string
}

export interface BankStatementType {
  transactions: BankTransaction[]
  bankAccount: BankAccount[]
}

interface BankTransaction {
  pageIndex?: number
  description: string
  amount: string
  transactionDate: string
}

export interface BankAccount {
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

export interface W2DocumentType {
  data: W2DocumentData[]
}

interface W2DocumentData {
  fieldName: string
  fieldValue: string
}

export interface EmployerInformationType {
  name: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
}

export interface EmployeeInformationType {
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

export interface PayStubType {
  payPeriodStartDate: string
  payPeriodEndDate: string
  netPay: string
  payDate: string
  provider: string
  frequency: string
}

export interface PayStubDistributionType {
  description: string
  bankName: string
  bankAccountType: string
  accountNumber: string
  amount: string
}

export interface PayStubEarningType {
  description?: string
  currentPay?: string
  ytdPay?: string
  currentHours?: string
  rate?: string
}

export interface PayStubDeductionType {
  currentPay: string
  ytdPay: string
  description: string
}

export interface PayStubCapturedType {
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

export interface AuthenticityType {
  score: number
  reasonCode: AuthenticityReason[]
}

export interface DocumentDetailsType {
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

export interface DocumentVisualization {
  pageNumber: number
  pageVisualizations: PageVisualization[]
}

interface PageVisualization {
  imageUrl: string
  displayName: string
  visualType: string
  description: string
}

export interface DocumentDetectType {
  detectData: SignalsDetectType
  visualizationData: VisualizationType
}

export interface SignalsCoordinatesType {
  left: number
  top: number
  right: number
  bottom: number
}
