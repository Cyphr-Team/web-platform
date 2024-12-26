/**
 * These interface name are perfectly align with class name on BE,
 * so we can easily find them to verify
 * */

export interface KybFormV2Metadata {
  businessLegalName: string
  businessStreetAddressLine1: string
  businessStreetAddressLine2?: string // optional
  businessStreetAddressState: string
  businessStreetAddressCity: string
  businessStreetAddressZipCode: string
  businessWebsite: string // default value is an empty string
  ein: string | undefined // corresponds to business_tin, this field use for BE
  businessTin: string | undefined // corresponds to ein, this field use for FE
}

export interface LaunchKcKybFormMetadata extends KybFormV2Metadata {
  yearFounded: string
  legalStructure: string
  primaryIndustry: string
  primaryIndustryOther: string // default value is an empty string
  companyDescription: string
}

export interface SbbKybFormMetadata extends KybFormV2Metadata {
  dba: string // default value is an empty string
  isSubsidiary: boolean // true/false instead of yes/no
  parentCompany?: string // optional if isSubsidiary is true
  industryType: string // convert to lowercase in v2
  yearsInOperation: string // convert to lowercase in v2
  customerType: string // convert to lowercase in v2
  numberOfW2Employees: string // convert to lowercase in v2
  involvedInWeaponsSales: boolean
  ownedByTrust: boolean
  isHoldingCompany: boolean
  cbdRelatedBusiness: boolean
  marijuanaRelatedBusiness: boolean
  politicalOrgContributor: boolean
  expectedAnnualSales: string // convert to lowercase in v2
  expectedDepositAmount: string // convert to lowercase in v2
  anticipatedCashActivities: boolean
  anticipatedCashAmount?: string // optional if anticipatedCashActivities is true
  paymentMethods: string[] // convert to lowercase in v2
  selfDirectedIraAccount: boolean
  monthlyDepositAmount: string // convert to lowercase in v2
  willReceiveInternationalPayments: boolean
  willReceiveInternationalWireTransfers: boolean
  willSendWireTransfers: boolean
  willReceiveWireTransfers: boolean
  willReceiveElectronicTransfers: boolean
  willSendElectronicTransfers: boolean
  isMoneyServiceBusiness: boolean
  isOwnsAndOperatesAtms: boolean
  isInvolvedInGambling: boolean
  isAllowThirdPartySlotMachines: boolean
  isSeniorForeignPoliticalFigure: boolean
}

export type KCChamberKybFormMetadata = KybFormV2Metadata

export interface LoanReadyKybFormMetadata extends KybFormV2Metadata {
  dba: string // default value is an empty string
  businessStage: string
  businessDescription: string
}

export interface CapitalCollabKybFormMetadata extends KybFormV2Metadata {
  dba: string // default value is an empty string
  businessStage: string
  businessDescription: string
  businessInceptionDate: string
  businessMoreThanOneBankAccount: boolean
  propertyLeaseOrOwn: string
  propertyPayment: number
  landlordName: string
  landlordPhone: string
  balanceDailyOrWeekly: boolean
  balanceTotal: number
  creditCardThreeMonths: boolean
  creditCardAverageVolume: number
  creditCardProcessor: string
}
