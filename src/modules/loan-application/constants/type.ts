export interface KYBInformation {
  loanApplicationId: string
  businessLegalName: string
  businessStreetAddress: BusinessStreetAddress
  businessWebsite: string
  businessTin: string
}

export interface KYBInformationResponse {
  id: string
  loanApplicationId: string
  businessLegalName: string
  businessStreetAddress: BusinessStreetAddress
  businessWebsite: string
  businessTin: string
  createdAt: string
  updatedAt: string
}

interface BusinessStreetAddress {
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
}

export interface KYCInformation {
  loanApplicationId: string
  fullName: string
  businessRole: string
  addressLine1: string
  addressLine2: string
  businessCity: string
  businessState: string
  businessZipCode: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  socialSecurityNumber: string
  businessOwnershipPercentage: number
  hasOtherSubstantialStackHolders: boolean
}

export interface KYCInformationResponse {
  id: string
  loanApplicationId: string
  fullName: string
  businessRole: string
  addressLine1: string
  addressLine2: string
  businessCity: string
  businessState: string
  businessZipCode: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  socialSecurityNumber: string
  businessOwnershipPercentage: number
  hasOtherSubstantialStackHolders: boolean
  createdAt: string
  updatedAt: string
}

export interface LoanProgramContactData {
  phone?: string
  location?: string
  mail?: string
}
export interface LoanProgramData {
  id: string
  type: string
  name: string
  loanAmountRange: string
  amount: string | number
  meta: Record<string, string>
  description?: string
  faqs?: Record<string, string>
  heroImage?: string
  contact?: LoanProgramContactData
  isUnderConstruction: boolean
}

export interface FinancialInformation {
  loanApplicationId: string
  incomeCategories: string[]
}

export interface FinancialInformationResponse {
  id: string
  loanApplicationId: string
  incomeCategories: string[]
  documents: string[]
  createdAt: string
  updatedAt: string
}

export interface DocumentUpload {
  formId: string
  formType: string
  files: File[]
}

export enum FORM_TYPE {
  KYB = "KYB",
  KYC = "KYC",
  FINANCIAL = "FINANCIAL"
}

export interface LoanProgramType {
  id: string
  institutionId: string
  name: string
  type: string
  description: string
  minTermInMonth: number
  maxTermInMonth: number
  interestRate: number
  interestRateType: LoanProgramInterestRateType
  interestRateDescription: string
  originationFee: number
  minLoanAmount: number
  maxLoanAmount: number
  createdAt: string
  updatedAt: string
}

enum LoanProgramInterestRateType {
  FIXED = "FIXED",
  VARIABLE = "VARIABLE",
  FLOATING = "FLOATING",
  PROMOTIONAL = "PROMOTIONAL"
}
