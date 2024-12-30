/**
 * Dear developers,
 *
 * If you are writing this note, may be you are trying to refactor my boom below. I just want to show you that my magic for you
 * to understand and take care of my child.
 *
 * Firstly, you might wonder if the type `number | string | undefined` mean this field is optional? Haha, no! We encounter some issues
 * about RHFPercentageInput and RHFNumberInput (maybe). `number` stand for actual type, `string` because value form RHFPercentageInput
 * is `string`, `undefined` use to prevent default value is `undefined` instead of 0.
 *
 * Secondly, regarding `boolean | string`, we encounter some issues related to RHFSelect, it cannot receive boolean value
 * so, we must use string "true" "false" instead. Shame on me...
 *
 * Summary: due to some limitation of the RHF universe, we must have some weir type here.
 * Go around with some form use RHFNumberInput or RHFPercentageInput, open React devtools, go to LoanApplicationFormProvider
 * and see the magic.
 *
 * ...
 * // may our travel continue? or more errors append here...
 * ...
 *
 * If you spent time here but can't fix it, please increase the counter below as a warning for others.
 * Total time spent here: 11 (hours)
 * */

/**
 * These interface names are perfectly aligned with class name on BE, so we can easily find them to verify
 * */
type StupidNumber = number | string | undefined

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
  areFounderOrCoFounder: boolean | string
  areFullTimeFounder: boolean | string
  businessOwnershipPercentage: StupidNumber
}

export interface LoanReadyKycFormMetadata extends BaseKycFormV2Metadata {
  // out of box
  personalCreditScore: string

  addressLine1: string
  businessRole: string
  businessState: string
  businessCity: string
  businessZipCode: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  socialSecurityNumber: string
  businessOwnershipPercentage: StupidNumber
}

export interface SbbKycFormMetadata extends BaseKycFormV2Metadata {
  firstName: string
  lastName: string
  addressLine1: string
  businessState: string
  businessCity: string
  businessZipCode: string
  businessRole: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  socialSecurityNumber: string
  businessOwnershipPercentage: StupidNumber
  hasBeneficialOwners: boolean
  beneficialOwners: {
    name: string
    email: string
    phoneNumber: string
    businessOwnershipPercentage: number | undefined
  }[]
  controlAuthorization: boolean | string
}

export interface KCChamberKycFormMetadata extends BaseKycFormV2Metadata {
  businessRole: string
  addressLine1: string
  addressLine2?: string
  businessState: string
  businessCity: string
  businessZipCode: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  socialSecurityNumber: string
  businessOwnershipPercentage: StupidNumber
}

interface CapitalCollabOwnerInformation extends BaseKycFormV2Metadata {
  addressLine1: string
  businessRole: string
  businessState: string
  businessCity: string
  businessZipCode: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  socialSecurityNumber: string
  businessOwnershipPercentage: StupidNumber
  personalCreditScore: string
  annualIncome: number
}

export interface CapitalCollabKycFormMetadata
  extends CapitalCollabOwnerInformation {
  isBusinessSolelyOwned: boolean
  additionalOwners: CapitalCollabOwnerInformation[]
}
