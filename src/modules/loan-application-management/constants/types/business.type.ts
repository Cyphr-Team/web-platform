/* ----- ENUM -----
 * TaskFieldStatus
 * SourceStatus
 * SubLabel
 */
enum TaskFieldStatus {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  WARNING = "WARNING"
}

enum SourceStatus {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "INACTIVE",
  UNKNOWN = "UNKNOWN"
}

enum SubLabel {
  VERIFIED = "VERIFIED"
}

export { TaskFieldStatus, SourceStatus, SubLabel }

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
 * Bankruptcies
 * Application KYB Detail Response
 */
// Source
type BusinessRegistrationSource = {
  link?: string
  status?: SourceStatus
  state?: string
}

// Insights
type InsightData = {
  category?: string
  subLabel?: SubLabel
  status?: TaskFieldStatus
  message?: string
}
type BusinessInsight = {
  businessName?: InsightData
  officeAddress?: InsightData
  sosFillings?: InsightData
  tin?: InsightData
  people?: InsightData
  watchlists?: InsightData
  bankruptcies?: InsightData
}

// Business Detail
type BusinessDetailData = {
  value?: string
  subLabel?: SubLabel
  status?: TaskFieldStatus
  source: BusinessRegistrationSource
  message?: string
}
type BusinessDetail = {
  name: BusinessDetailData
  address: BusinessDetailData
  tin: BusinessDetailData
  formationState: BusinessDetailData
  formationDate: BusinessDetailData
  entityType: BusinessDetailData
}

// Name
type BusinessNameDetail = {
  name: string
  status?: TaskFieldStatus
  submitted: boolean
  source: BusinessRegistrationSource
}
type BusinessNameData = {
  subLabel?: SubLabel
  data: BusinessNameDetail[]
}

// Address
type BusinessAddressDetail = {
  address: string
  status?: TaskFieldStatus
  submitted: boolean
  source: BusinessRegistrationSource
  deliverable: boolean
  cmra: boolean
  registeredAgent: boolean
}
type BusinessAddressData = {
  subLabel?: SubLabel
  data: BusinessAddressDetail[]
}

// SOS Fillings
type BusinessSosDetail = {
  fileDate?: string
  state?: string
  status?: SourceStatus
  subStatus?: string
  source: BusinessRegistrationSource
}
type BusinessSosData = {
  active: number
  inactive: number
  unknown: number
  subLabel?: SubLabel
  data: BusinessSosDetail[]
}

// Tin
type BusinessTinDetail = {
  matchedBusinessName?: string
  tin?: string
}
type BusinessTinData = {
  subLabel?: SubLabel
  data: BusinessTinDetail
}

// People
type BusinessPeopleDetail = {
  name?: string
  submitted: boolean
  source: BusinessRegistrationSource
  title: string[]
}
type BusinessPeopleData = {
  subLabel?: SubLabel
  data: BusinessPeopleDetail[]
}

// Watchlist
type BusinessWatchlistDetail = {
  found?: string
  agency?: string
  organization?: string
  list?: string
  listCountry?: string
  listRegion?: string
  sourceUrl?: string
  sourceCategory: string[]
}
type BusinessWatchlistData = {
  businessName: string
  people?: string
  isBusinessNameHit: boolean
  isPeopleHit: boolean
  data: BusinessWatchlistDetail[]
}

// Bankruptcies
type BusinessBankruptcyDetail = {
  fileDate?: string
  chapter?: number
  caseNumber?: string
  court?: string
}
type BusinessBankruptcyData = {
  subLabel?: SubLabel
  data: BusinessBankruptcyDetail[]
}

// Application KYB Detail Response
type ApplicationKybDetailResponse = {
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
  BusinessSosData
}
