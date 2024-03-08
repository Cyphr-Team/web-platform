import { TaskFieldStatus } from "./business.type"

export type LoanApplicationsKyc = {
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

type ApplicationKycStatus = {
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

type ApplicationKycSummary = {
  personalInfo: ApplicationKycStatus
  idCheck: ApplicationKycStatus
  checkList: ApplicationKycStatus
}

type ApplicationKycPersonalInfo = {
  name?: string
  dateOfBirth?: string
  residentialAddress?: string
  email?: string
  phoneNumber?: string
}

type ApplicationKycIdCheck = {
  driverLicense: ApplicationKycStatus
  passport: ApplicationKycStatus
}

type ApplicationKycCheckList = {
  category?: string
  message?: string
  status?: TaskFieldStatus
  subLabel?: string
}
