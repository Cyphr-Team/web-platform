import { KYC_STATUS } from "./kyc"

/* ----- ENUM ----- */
enum MIDDESK_HIT_STATUS {
  HITS = "HITS",
  NO_HITS = "NO_HITS"
}

enum MIDDESK_ACTIVE_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DOMESTIC_ACTIVE = "DOMESTIC_ACTIVE"
}

enum MIDDESK_FOUND_STATUS {
  NONE_FOUND = "NONE_FOUND",
  FOUND = "FOUND"
}

type MiddeskStatus =
  | MIDDESK_HIT_STATUS
  | MIDDESK_ACTIVE_STATUS
  | MIDDESK_FOUND_STATUS
  | KYC_STATUS
export type { MiddeskStatus }
export { MIDDESK_HIT_STATUS, MIDDESK_ACTIVE_STATUS, MIDDESK_FOUND_STATUS }

/* ----- TYPE ----- */
type TypicalMetadata = {
  fileNumber?: string
  jurisdiction?: string
  state?: string

  // Need enum status?
  status?: KYC_STATUS | MIDDESK_HIT_STATUS
}

/* ----- COMMON ----- */
type MiddeskSourcesReport = {
  id?: string
  type?: string
  metadata?: TypicalMetadata
}

type MiddeskTableContentReport = {
  name?: string
  submitted?: boolean
  notes?: string
  sources?: MiddeskSourcesReport[]
  status?: KYC_STATUS | MIDDESK_HIT_STATUS
}

/* ----- TIN ----- */
type TinMatchReport = {
  name?: string
  status?: KYC_STATUS
  taxID?: string
}

/* ----- WATCHLISTS ----- */
type WatchlistsReport = {
  business?: MiddeskTableContentReport
  individual?: MiddeskTableContentReport
}

type WatchlistsHitsReport = {
  found?: string
  agency?: string
  agencyCountry?: string
  list?: string
  country?: string
  subCountry?: string
  sources?: MiddeskSourcesReport[]
  status?: KYC_STATUS | MIDDESK_HIT_STATUS
}

/* ----- SECRETARY ----- */

export type RegistrationStatus = {
  active?: number
  inactive?: number
  unknown?: number
}

type SecretaryReport = {
  status?: MIDDESK_ACTIVE_STATUS
  fileDate?: string
  state?: string
  sources?: MiddeskSourcesReport[]
}

/* ----- Bankruptcy ----- */
type BankruptcyReport = {
  status?: MIDDESK_FOUND_STATUS
}

export type {
  MiddeskTableContentReport,
  TinMatchReport,
  WatchlistsReport,
  WatchlistsHitsReport,
  SecretaryReport,
  MiddeskSourcesReport,
  BankruptcyReport
}
