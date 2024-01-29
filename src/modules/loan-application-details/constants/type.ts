export type LoanApplicationsKyb = {
  insights: KybDetailInsights
  businessName: KybVerifiedField
  tax: KybVerifiedFieldLabel
  businessVerificationStatus: KYB_VERIFIED_FIELD_STATUS
  registrationStatus: KybDetailRegistrationStatus
  industryClassification: string[]
  formation: KybDetailFormation
  officeAddresses: string[]
  website: KybDetailWebsite
  phoneNumber: string
  liens: KybDetailLiens
}

type KybDetailInsights = {
  businessNameVerification: KYB_VERIFIED_FIELD_STATUS
  officeAddressVerification: KYB_VERIFIED_FIELD_STATUS
  peopleVerification: KYB_VERIFIED_FIELD_STATUS
  tinMatch: KYB_VERIFIED_FIELD_STATUS
  watchlistScreening: KYB_VERIFIED_FIELD_STATUS
}

type KybVerifiedField = {
  status: KYB_VERIFIED_FIELD_STATUS
  value: string
}

type KybVerifiedFieldLabel = {
  label: string
  status: KYB_VERIFIED_FIELD_STATUS
  value: string
}

export enum KYB_VERIFIED_FIELD_STATUS {
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  FAILURE = "FAILURE",
  UNKNOWN = "UNKNOWN"
}

type KybDetailRegistrationStatus = {
  active: number
  inactive: number
  unknown: number
}

type KybDetailFormation = {
  state: string
  date: string
  entityType: string
}

type KybDetailWebsite = {
  url: string
  description: string
}

type KybDetailLiens = {
  open: number
  closed: number
  data: KybDetailLiensData[]
}

type KybDetailLiensData = {
  type: string
  date: string
  status: KybDetailLienStatus
  securedParties: string[]
  fileUrl: string[]
}

type KybDetailLienStatus = {
  OPEN: "OPEN"
  CLOSED: "CLOSED"
  UNKNOWN: "UNKNOWN"
}
