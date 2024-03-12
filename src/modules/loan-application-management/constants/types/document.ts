import {
  AuthenticityReason,
  SignalsDetectType,
  SignalsType,
  VisualizationType
} from "../type"

export type BankStatementType = {
  transactions: BankTransaction[]
  bankAccount: BankAccount[]
}

type BankTransaction = {
  description: string
  amount: string
  transactionDate: string
}

export type BankAccount = {
  name: string
  bankName: string
  accountNumber: string
  accountType: string
  accountHolder: string
  holderZip: string
  holderAddress1: string
  holderAddress2: string
  holderCity: string
  holderState: string
  holderCountry: string
  accountCategory: string
}

export type W2DocumentType = {
  data: W2DocumentData[]
}

type W2DocumentData = {
  fieldName: string
  fieldValue: string
}

export type EmployerInformationType = {
  name: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
}

export type EmployeeInformationType = {
  name: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
  maritalStatus: string
  taxIdType: string
  last4Digits: string
}

export type PayStubType = {
  payPeriodStartDate: string
  payPeriodEndDate: string
  netPay: string
  payDate: string
  provider: string
  frequency: string
}

export type PayStubDistributionType = {
  description: string
  bankName: string
  bankAccountType: string
  accountNumber: string
  amount: string
}

export type PayStubEarningType = {
  description?: string
  currentPay?: string
  ytdPay?: string
  currentHours?: string
  rate?: string
}

export type PayStubDeductionType = {
  currentPay: string
  ytdPay: string
  description: string
}

export type PayStubCapturedType = {
  employeeInformation: EmployeeInformationType
  employerInformation: EmployerInformationType
  payStubDetail: PayStubType
  earnings: PayStubEarningType[]
  deductions: PayStubDeductionType[]
  payDistribution: PayStubDistributionType[]
}

export enum DocumentType {
  BANK_STATEMENT = "bank_statement",
  W2 = "form",
  PAY_STUB = "paystub"
}

export type AuthenticityType = {
  score: number
  reasonCode: AuthenticityReason[]
}

export type DocumentDetailsType = {
  documentType: DocumentType
  documentStatus: string
  detect: {
    visualizations: DocumentVisualization[]
    signals: SignalsType[]
    formAuthenticity: AuthenticityType
  }
  capture: PayStubCapturedType | BankStatementType | W2DocumentType
}

export type DocumentVisualization = {
  pageNumber: number
  pageVisualizations: PageVisualization[]
}

type PageVisualization = {
  imageUrl: string
  displayName: string
  visualType: string
  description: string
}

export type DocumentDetectType = {
  detectData: SignalsDetectType
  visualizationData: VisualizationType
}

export type SignalsCoordinatesType = {
  left: number
  top: number
  right: number
  bottom: number
}
