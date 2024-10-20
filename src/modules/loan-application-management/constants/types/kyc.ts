import { type TaskFieldStatus } from "./business.type"

export interface LoanApplicationsKyc {
  kycStatus: ApplicationKycStatus
  summary: ApplicationKycSummary
  personalInfo: ApplicationKycPersonalInfo
  idCheck: ApplicationKycIdCheck
  checkLists: {
    bankruptcies?: ApplicationKycCheckList
    sosFillings?: ApplicationKycCheckList
    watchlists?: ApplicationKycCheckList
  }
}

interface ApplicationKycStatus {
  status: KYC_STATUS
  reason?: string
}

export enum KYC_STATUS {
  UNKNOWN = "UNKNOWN",
  PASSED = "PASSED",
  VERIFIED = "VERIFIED",
  UNVERIFIED = "UNVERIFIED",
  UNCHECKED = "UNCHECKED",
  FAILED = "FAILED"
}

interface ApplicationKycSummary {
  personalInfo: ApplicationKycStatus
  idCheck: ApplicationKycStatus
  checkList: ApplicationKycStatus
}

interface ApplicationKycPersonalInfo {
  name?: string
  dateOfBirth?: string
  residentialAddress?: string
  email?: string
  phoneNumber?: string
}

interface ApplicationKycIdCheck {
  driverLicense: ApplicationKycStatus
  passport: ApplicationKycStatus
}

interface ApplicationKycCheckList {
  category?: string
  message?: string
  status?: TaskFieldStatus
  subLabel?: string
}
