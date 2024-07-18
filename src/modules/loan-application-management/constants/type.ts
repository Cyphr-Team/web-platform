import { InsightStatus } from "./types/insight.type"

export type Verification = {
  value: string
  verification?: {
    status?: InsightStatus
    subLabel?: string
  }
}

export type LoanApplicationsKyb = {
  insights: KybDetailInsights
  businessName: Verification
  tin: Verification
  businessVerificationStatus: KYB_VERIFIED_FIELD_STATUS
  registrationStatus: KybDetailRegistrationStatus
  industryClassification: string[]
  formation: Verification
  officeAddresses: Verification
  website: KybDetailWebsite
  phoneNumber: string
  liens: KybDetailLiens
}

export type KybDetailInsights = {
  businessNameVerification: KYB_VERIFIED_FIELD_STATUS
  officeAddressVerification: KYB_VERIFIED_FIELD_STATUS
  peopleVerification: KYB_VERIFIED_FIELD_STATUS
  tinMatch: KYB_VERIFIED_FIELD_STATUS
  watchlistScreening: KYB_VERIFIED_FIELD_STATUS
}

export enum KYB_VERIFIED_FIELD_STATUS {
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  FAILURE = "FAILURE",
  UNKNOWN = "UNKNOWN"
}

export type KybDetailRegistrationStatus = {
  active: number
  inactive: number
  unknown: number
}

type KybDetailWebsite = {
  url: string
  description: string
}

export type KybDetailLiens = {
  open: number
  closed: number
  data: KybDetailLiensData[]
}

export type KybDetailLiensData = {
  type: string
  date: string
  status: KYB_LIEN_STATUS
  securedParties: string[]
  fileUrl: string[]
}

export enum KYB_LIEN_STATUS {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  UNKNOWN = "UNKNOWN"
}

export type SignalsType = {
  signalIdentifier: string // "account_number_edits"
  signalIdentifierDescription: string //"Account Number was modified as follows"
  signalDisplayName: string //"Account Number Edits"
  signalCount: number
  tabularData: TabularData
}

type TabularHeader = {
  [key: string]: string
}

export type TabularData = {
  headers: TabularHeader[]
  rows: TabularDataRows[]
}

export type TabularDataRows = {
  values: string[]
}
export type SignalsDetectType = {
  signals: SignalsType[]
  formAuthenticity: AuthenticityType
  signalCount: number
}

type AuthenticityType = {
  authenticityLevel: AUTHENTICITY_LEVEL
  title: string
  description: string
  reasonCodeDescription: AuthenticityReason[]
  authenticityLevelColor: string
  authenticityScore: number
}

export type AuthenticityReason = {
  reasonCode: string
  description: string
  confidence: string
  shouldHighlight: boolean
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

export enum LoanSummaryDownloadType {
  CSV = "CSV",
  JSON = "JSON",
  PDF = "PDF"
}
