export type LoanApplicationsKyc = {
  kycStatus: ApplicationKycStatus
  summary: ApplicationKycSummary
  personalInfo: ApplicationKycPersonalInfo
  idCheck: ApplicationKycIdCheck
  checkLists: ApplicationKycCheckList
}

type ApplicationKycStatus = {
  status: KYC_STATUS
  reason?: string
}

type ApplicationKycPayloadStatus = {
  payload: string
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
  name: ApplicationKycPayloadStatus
  dateOfBirth: ApplicationKycPayloadStatus
  residentialAddress: ApplicationKycPayloadStatus
  email: ApplicationKycPayloadStatus
  phoneNumber: ApplicationKycPayloadStatus
}

type ApplicationKycIdCheck = {
  driverLicense: ApplicationKycStatus
  passport: ApplicationKycStatus
}

type ApplicationKycCheckList = {
  name: ApplicationKycStatus
  pepSanctions: ApplicationKycStatus
  internalBlocklist: ApplicationKycStatus
  duplicate: ApplicationKycStatus
  fraud: ApplicationKycStatus
  biometrics: ApplicationKycStatus
}
