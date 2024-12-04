/**
 * These interface name are perfectly align with class name on BE,
 * so we can easily find them to verify
 * */

export interface BaseKycFormV2Metadata {
  fullName: string
}

export interface LaunchKcKycFormMetadata extends BaseKycFormV2Metadata {
  firstName: string
  lastName: string
  businessRole: string
  genderIdentity: string
  preferredPronoun: string
  racialIdentification: string
  ethnicIdentification: string
  addressLine1: string
  addressLine2?: string
  businessState: string
  businessCity: string
  businessZipCode: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  socialSecurityNumber: string
  areFounderOrCoFounder: boolean
  areFullTimeFounder: boolean
  businessOwnershipPercentage: number
}

export interface LoanReadyKycFormMetadata extends BaseKycFormV2Metadata {
  businessRole: string
  addressLine1: string
  businessState: string
  businessCity: string
  businessZipCode: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  socialSecurityNumber: string
  businessOwnershipPercentage: number
  personalCreditScore: string
}

export interface SbbKycFormMetadata extends BaseKycFormV2Metadata {
  firstName: string
  lastName: string
  residentialAddress: string
  businessState: string
  businessCity: string
  businessZipCode: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  socialSecurityNumber: string
  businessRole: string
  businessOwnershipPercentage: number
  beneficialOwners: boolean
  controlAuthorization: boolean
}

export interface KCChamberKycFormMetadata extends BaseKycFormV2Metadata {
  businessRole: string
  addressLine1: string
  addressLine2: string
  businessState: string
  businessCity: string
  businessZipCode: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  socialSecurityNumber: string
  businessOwnershipPercentage: boolean
}
