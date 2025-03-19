/* ----- ENUM -----
 * TaskFieldStatus
 * SourceStatus
 * SubLabel
 */
enum TaskFieldStatus {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  PENDING = "PENDING",
  WARNING = "WARNING"
}

enum SourceStatus {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "INACTIVE",
  UNKNOWN = "UNKNOWN"
}

export { TaskFieldStatus, SourceStatus }

/* ----- TYPE -----
 * Source
 * Insights
 * Business Detail
 * Name
 * Address
 * SOS Fillings
 * Tin
 * People
 * Watch list
 * Industry Classification
 * Bankruptcies
 * Website
 * Adverse Media
 * Application KYB Detail Response
 */
// Source
interface BusinessRegistrationSource {
  link?: string
  status?: SourceStatus
  state?: string
}

// Insights
interface InsightData {
  category?: string
  subLabel?: string
  status?: TaskFieldStatus
  message?: string
}
interface BusinessInsight {
  businessName?: InsightData
  officeAddress?: InsightData
  sosFillings?: InsightData
  tin?: InsightData
  people?: InsightData
  watchlists?: InsightData
  bankruptcies?: InsightData
  industry?: InsightData
  website?: InsightData
  adverseMedia?: InsightData
}

// Business Detail
interface BusinessDetailData {
  value?: string
  subLabel?: string
  status?: TaskFieldStatus
  source: BusinessRegistrationSource
  message?: string
}
interface BusinessDetail {
  name: BusinessDetailData
  address: BusinessDetailData
  tin: BusinessDetailData
  formationState: BusinessDetailData
  formationDate: BusinessDetailData
  entityType: BusinessDetailData
}

// Name
interface BusinessNameDetail {
  name: string
  status?: TaskFieldStatus
  submitted: boolean
  source: BusinessRegistrationSource
}
interface BusinessNameData {
  subLabel?: string
  data: BusinessNameDetail[]
}

// Address
interface BusinessAddressDetail {
  address: string
  status?: TaskFieldStatus
  submitted: boolean
  source: BusinessRegistrationSource
  deliverable: boolean
  cmra: boolean
  registeredAgent: boolean
}
interface BusinessAddressData {
  subLabel?: string
  data: BusinessAddressDetail[]
}

// SOS Fillings
interface BusinessSosDetail {
  fileDate?: string
  state?: string
  status?: SourceStatus
  subStatus?: string
  source: BusinessRegistrationSource
}
interface BusinessSosData {
  active: number
  inactive: number
  unknown: number
  subLabel?: string
  data: BusinessSosDetail[]
}

// Tin
interface BusinessTinDetail {
  matchedBusinessName?: string
  tin?: string
}
interface BusinessTinData {
  subLabel?: string
  data: BusinessTinDetail
}

// People
interface BusinessPeopleDetail {
  name?: string
  submitted: boolean
  source: BusinessRegistrationSource
  title: string[]
}
interface BusinessPeopleData {
  subLabel?: string
  data: BusinessPeopleDetail[]
}

// Watchlist
interface BusinessWatchlistDetail {
  found?: string
  agency?: string
  organization?: string
  list?: string
  listCountry?: string
  listRegion?: string
  sourceUrl?: string
  sourceCategory: string[]
}
interface BusinessWatchlistData {
  businessName: string
  people?: string
  isBusinessNameHit: boolean
  isPeopleHit: boolean
  data: BusinessWatchlistDetail[]
}

// Bankruptcies
interface BusinessBankruptcyDetail {
  fileDate?: string
  chapter?: number
  caseNumber?: string
  court?: string
}
interface BusinessBankruptcyData {
  subLabel?: string
  data: BusinessBankruptcyDetail[]
}

// Industry Classification
interface BusinessIndustryClassificationDetail {
  classificationSystem?: string
  code?: string[]
  category?: string
  confidence?: number
}

interface BusinessIndustryClassificationData {
  subLabel?: string
  data: BusinessIndustryClassificationDetail[]
}

export const BusinessIndustryClassificationHighRiskCategory = {
  ADULT_CONTENT: "ADULT_CONTENT",
  AGGREGATION: "AGGREGATION",
  CANNABIS: "CANNABIS",
  BRANDED_GOODS: "BRANDED_GOODS",
  DRUG_OF_CONCERN: "DRUG_OF_CONCERN",
  DRUG_PARAPHERNALIA: "DRUG_PARAPHERNALIA",
  GAMBLING: "GAMBLING",
  GET_RICH_QUICK: "GET_RICH_QUICK",
  GIFT_CARD: "GIFT_CARD",
  HIGH_RISK: "HIGH_RISK",
  INVESTMENT_CREDIT: "INVESTMENT_CREDIT",
  MONEY_LEGAL: "MONEY_LEGAL",
  MULTI_LEVEL_MARKETING: "MULTI_LEVEL_MARKETING",
  PSEUDO_PHARMACEUTICAL: "PSEUDO_PHARMACEUTICAL",
  REGULATED_ILLEGAL: "REGULATED_ILLEGAL",
  SOCIAL_MEDIA_ACTIVITY: "SOCIAL_MEDIA_ACTIVITY"
}

// Website
interface BusinessWebsiteDetail {
  status?: string
  identifiedWebPresence?: string
  website?: string
  created?: string
  phoneNumber?: string[]
  online?: string
}

interface BusinessWebsiteData {
  subLabel?: string
  data: BusinessWebsiteDetail
}

export enum BusinessWebsiteFieldStatus {
  Online = "online",
  Offline = "offline",
  Unknown = "unknown"
}
// Adverse Media
interface BusinessAdverseMediaScreened {
  value: string
  field: string
}
interface BusinessAdverseMediaRisk {
  subLabel: string
  status: TaskFieldStatus
}
interface BusinessAdverseMediaDetail {
  screened: BusinessAdverseMediaScreened
  risk: BusinessAdverseMediaRisk
  mediaSources: string
}
interface BusinessAdverseMediaData {
  status: TaskFieldStatus
  subLabel?: string
  data: BusinessAdverseMediaDetail[]
}

// Application KYB Detail Response
interface ApplicationKybDetailResponse {
  insights: BusinessInsight
  updatedAt: string
  businessDetails: BusinessDetail
  businessNames: BusinessNameData
  businessAddresses: BusinessAddressData
  businessSosFillings: BusinessSosData
  businessTin: BusinessTinData
  businessPeople: BusinessPeopleData
  businessWatchlist: BusinessWatchlistData
  businessBankruptcies: BusinessBankruptcyData
  businessIndustryClassification: BusinessIndustryClassificationData
  businessWebsite: BusinessWebsiteData
  businessAdverseMedia: BusinessAdverseMediaData
}

export type {
  ApplicationKybDetailResponse,
  BusinessRegistrationSource,
  BusinessDetail,
  BusinessNameDetail,
  BusinessSosDetail,
  BusinessTinDetail,
  BusinessWatchlistDetail,
  BusinessWatchlistData,
  BusinessBankruptcyDetail,
  BusinessAddressDetail,
  BusinessSosData,
  BusinessIndustryClassificationDetail,
  BusinessIndustryClassificationData,
  BusinessWebsiteData,
  BusinessWebsiteDetail,
  BusinessAdverseMediaData,
  BusinessAdverseMediaDetail,
  BusinessAdverseMediaScreened,
  BusinessAdverseMediaRisk
}
